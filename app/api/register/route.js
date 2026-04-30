function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }

  return age;
}

function createReferenceId() {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 900 + 100);
  return `SC-${timestamp}-${random}`;
}

function normalizeText(value) {
  return String(value ?? "").trim();
}

function getRequiredFields(body) {
  return [
    ["firstName", body.firstName],
    ["lastName", body.lastName],
    ["birthDate", body.birthDate],
    ["sex", body.sex],
    ["civilStatus", body.civilStatus],
    ["barangay", body.barangay],
    ["city", body.city],
    ["province", body.province],
    ["phone", body.phone],
    ["email", body.email]
  ];
}

async function forwardToPhpSystem(payload) {
  const backendUrl = process.env.LGU_API_URL;
  const apiKey = process.env.LGU_API_KEY;

  if (!backendUrl) {
    throw new Error("LGU_API_URL is not configured in Vercel.");
  }

  if (!apiKey) {
    throw new Error("LGU_API_KEY is not configured in Vercel.");
  }

  const response = await fetch(backendUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey
    },
    body: JSON.stringify(payload),
    cache: "no-store"
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "LGU backend rejected the registration.");
  }

  return data;
}

export async function POST(request) {
  try {
    const body = await request.json();

    for (const [field, value] of getRequiredFields(body)) {
      if (!normalizeText(value)) {
        return Response.json(
          { message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const age = calculateAge(body.birthDate);

    if (Number.isNaN(age)) {
      return Response.json({ message: "Invalid birth date." }, { status: 400 });
    }

    if (age < 60) {
      return Response.json(
        {
          message: "Applicant is not yet qualified for senior citizen registration."
        },
        { status: 400 }
      );
    }

    const referenceId = createReferenceId();

    const payload = {
      referenceId,
      source: "vercel_portal",
      applicationStatus: "pending",
      firstName: normalizeText(body.firstName),
      middleName: normalizeText(body.middleName),
      lastName: normalizeText(body.lastName),
      birthDate: normalizeText(body.birthDate),
      age,
      sex: normalizeText(body.sex),
      civilStatus: normalizeText(body.civilStatus),
      houseNo: normalizeText(body.houseNo),
      street: normalizeText(body.street),
      barangay: normalizeText(body.barangay),
      city: normalizeText(body.city),
      province: normalizeText(body.province),
      phone: normalizeText(body.phone),
      email: normalizeText(body.email)
    };

    const backendResult = await forwardToPhpSystem(payload);

    return Response.json({
      message:
        backendResult.message ||
        "Registration submitted successfully. Please wait for LGU verification.",
      referenceId: backendResult.referenceId || referenceId
    });
  } catch (error) {
    return Response.json(
      {
        message: error.message || "Unable to process registration at the moment."
      },
      { status: 500 }
    );
  }
}
