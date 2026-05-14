const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/api/enquiry', async (req, res) => {
  const { firstName, lastName, email, phone, propertyType, bhk, service } = req.body;

  const html = `
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; }
</style>
<div style="background:#f4f4f5;padding:2rem 1.5rem;border-radius:12px;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:0.5px solid #e4e4e7;border-radius:12px;overflow:hidden;">

    <div style="background:#1a1a2e;padding:2rem;display:flex;align-items:center;gap:14px;">
      <div style="width:42px;height:42px;border-radius:10px;background:rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="1.5">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          <polyline points="9,22 9,12 15,12 15,22"/>
        </svg>
      </div>
      <div>
        <div style="font-size:15px;font-weight:500;color:#fff;">Eastlake Emporium</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-top:2px;">Interior Design Studio</div>
      </div>
    </div>

    <div style="padding:2rem;">

      <div style="display:inline-flex;align-items:center;gap:6px;background:#E6F1FB;color:#185FA5;font-size:11px;font-weight:500;padding:4px 10px;border-radius:20px;letter-spacing:0.04em;text-transform:uppercase;margin-bottom:1.25rem;">
        <span style="width:6px;height:6px;border-radius:50%;background:#185FA5;display:inline-block;"></span>
        New enquiry received
      </div>

      <div style="font-size:20px;font-weight:500;color:#111;margin-bottom:0.35rem;">New consultation request</div>
      <div style="font-size:13px;color:#666;margin-bottom:1.75rem;line-height:1.5;">A client has submitted a consultation enquiry via your website. Review the details below and follow up at your earliest convenience.</div>

      <div style="height:0.5px;background:#e4e4e7;margin:1.5rem 0;"></div>

      <div style="font-size:10px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:#999;margin-bottom:0.85rem;">Client information</div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:1.5rem;">
        <div style="background:#f4f4f5;border:0.5px solid #e4e4e7;border-radius:8px;padding:12px 14px;">
          <div style="font-size:11px;color:#999;margin-bottom:4px;">Name</div>
          <div style="font-size:14px;font-weight:500;color:#111;">${firstName} ${lastName}</div>
        </div>
        <div style="background:#f4f4f5;border:0.5px solid #e4e4e7;border-radius:8px;padding:12px 14px;">
          <div style="font-size:11px;color:#999;margin-bottom:4px;">Phone</div>
          <div style="font-size:14px;font-weight:500;color:#111;">${phone}</div>
        </div>
        <div style="background:#f4f4f5;border:0.5px solid #e4e4e7;border-radius:8px;padding:12px 14px;grid-column:span 2;">
          <div style="font-size:11px;color:#999;margin-bottom:4px;">Email</div>
          <div style="font-size:14px;font-weight:500;color:#185FA5;">${email}</div>
        </div>
      </div>

      <div style="font-size:10px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:#999;margin-bottom:0.85rem;">Project details</div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:1rem;">
        <div style="background:#f4f4f5;border:0.5px solid #e4e4e7;border-radius:8px;padding:12px 14px;">
          <div style="font-size:11px;color:#999;margin-bottom:4px;">Property type</div>
          <div style="font-size:14px;font-weight:500;color:#111;">${propertyType}</div>
        </div>
        <div style="background:#f4f4f5;border:0.5px solid #e4e4e7;border-radius:8px;padding:12px 14px;">
          <div style="font-size:11px;color:#999;margin-bottom:4px;">Configuration</div>
          <div style="font-size:14px;font-weight:500;color:#111;">${bhk}</div>
        </div>
      </div>

      <div style="background:#1a1a2e;border-radius:8px;padding:14px 16px;display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;">
        <div>
          <div style="font-size:11px;color:rgba(255,255,255,0.4);letter-spacing:0.06em;text-transform:uppercase;margin-bottom:3px;">Requested service</div>
          <div style="font-size:15px;font-weight:500;color:#fff;">${service}</div>
        </div>
      </div>

      <div style="display:flex;gap:10px;">
        <a href="mailto:${email}" style="flex:1;padding:10px 16px;border-radius:8px;font-size:13px;font-weight:500;background:#1a1a2e;color:#fff;text-align:center;text-decoration:none;">Reply to client</a>
      </div>

    </div>

    <div style="border-top:0.5px solid #e4e4e7;padding:1rem 2rem;display:flex;align-items:center;justify-content:space-between;">
      <div style="font-size:11px;color:#999;">Powered by Eastlake Emporium</div>
    </div>

  </div>
</div>`;

  try {
    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'yuvaraj6867@gmail.com',
      subject: 'New Consultation Enquiry — Eastlake Emporium',
      html,
    });

    if (error) return res.status(400).json({ success: false, error });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(4000, () => console.log('Server running on http://localhost:4000'));
