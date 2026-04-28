const serviceId = 'service_pclebg8';
const templateId = 'template_lzrt5vq'; // Primary notification
const autoReplyTemplateId = 'template_l3kcplq'; // Auto-reply
const publicKey = 'sLK9nXl-_3vSM-o4K';

async function sendEmailJS(template_id, template_params) {
  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: template_id,
      user_id: publicKey,
      template_params: template_params
    })
  });
  
  if (response.ok) {
    return "OK";
  } else {
    const text = await response.text();
    throw new Error(`${response.status} ${text}`);
  }
}

async function test() {
  try {
    console.log("Testing primary template...");
    await sendEmailJS(templateId, {
      from_name: 'Test Name',
      to_name: 'Meridian College Admissions',
      user_email: 'test@example.com',
      phone: '1234567890',
      course: '+2 Science',
      message: 'Test message'
    });
    console.log("Primary template success!");
  } catch (error) {
    console.error("Primary template error:", error.message);
  }

  try {
    console.log("Testing auto-reply template...");
    await sendEmailJS(autoReplyTemplateId, {
      to_email: 'test@example.com',
      to_name: 'Test Name',
      from_name: 'Meridian College Admissions',
      student_name: 'Test Name',
      phone: '1234567890',
      course: '+2 Science',
      message: 'Test message',
      reply_to: 'principalmeridiancollege@gmail.com',
    });
    console.log("Auto-reply template success!");
  } catch (error) {
    console.error("Auto-reply template error:", error.message);
  }
}

test();
