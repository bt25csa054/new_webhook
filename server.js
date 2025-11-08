
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  const intent = req.body.queryResult.intent.displayName;
  const params = req.body.queryResult.parameters;

  if (intent === 'Student Info') {
    const name = params.student_name || 'student';
    const email = params.email || 'no email provided';
    const course = params.course || 'unknown course';

    return res.json({
      fulfillmentText: `Thanks ${name}! I’ve saved your application for ${course}. I’ll contact you at ${email}.`
    });
  }

  res.json({ fulfillmentText: "I'm not sure how to handle that yet!" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Webhook server running on port ${PORT}`));
