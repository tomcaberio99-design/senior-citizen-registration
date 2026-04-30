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

export async function POST(request) {
  try {
    const body = await request.json();
    const requiredFields = [
      "firstName",
      "lastName",
      "birthDate",
      "sex",
      "civilStatus",
      "barangay",
      "city",
      "province",
      "phone"
    ];

    for (const field of requiredFields) {
      if (!body[field] || String(body[field]).trim() === "") {
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

    return Response.json({
      message:
        "Registration submitted successfully. This online application should be reviewed as a pending record in the LGU system.",
      referenceId,
      submittedData: {
        ...body,
        age,
        referenceId,
        applicationStatus: "pending"
      }
    });
  } catch {
    return Response.json(
      { message: "Unable to process registration at the moment." },
      { status: 500 }
    );
  }
}
