<div align="center">
  <img src="https://raw.githubusercontent.com/thinkapoorv/EasyView/main/icons/icon128.png" alt="EasyView Logo" width="120" style="border-radius: 20px; box-shadow: 0 0 40px rgba(0, 120, 255, 0.4);" />

  # ✦ **EasyView Extension Privacy Policy** ✦
  **EasyView is designed with your privacy as the top priority. We implement a strict separation between sensitive data and user preferences.**

  [![Version: 1.1.1.4](https://img.shields.io/badge/Version-1.1.1.4-000000?style=for-the-badge&logo=vercel)](#)
  [![State: Privacy First](https://img.shields.io/badge/State-Privacy_First-0055FF?style=for-the-badge)](#)

  > *We will never sell, share, or monetize your personal data. Period.*
</div>

---

<br>

> [!NOTE]
> **Important:** For our full, legally binding Privacy Policy regarding your EasyView Account, Premium Subscriptions, and Website interactions, please read the [Official EasyView Privacy Policy](https://easyview.in/privacy-policy).

## 🔒 Extension Data Storage

### **Local-Only Storage (Bring Your Own Key)**
If you choose to use the "Bring Your Own Key" (BYOK) feature instead of our built-in Premium quotas, your Google Gemini or OpenRouter API key is stored using `chrome.storage.local`. This means it:
- ✅ **Never syncs** to any cloud service
- ✅ **Device-only** - stays on your computer
- ✅ **No transmission** - never leaves your device to our servers

### **Sync Storage (Settings & Premium Status)**
User preferences (feature toggles, visual settings) and your securely hashed Premium Status are stored using `chrome.storage.sync`, which:
- ✅ Syncs across your Chrome browsers
- ✅ Includes basic account metadata (email) if you are logged in
- ✅ Does **NOT** include custom API keys

---

## ⚡ AI API Usage & Third Parties

How EasyView features (Jargon Decoder, Text Simplification, and Morph Engine) communicate with AI models depends on your usage tier and **EasyView AI Priority** settings:

*   **Free / Premium Tier (Built-in Mode):** Your request is securely routed through our backend (`easyview.in`) using our corporate API keys. We enforce strict quotas to prevent abuse, but **we do not store or log the text you highlight or the websites you morph**. 
*   **Bring Your Own Key (BYOK) - Local Mode:** If you provide your own Gemini or OpenRouter API key and set your priority to **My API Key**, standard features like Jargon Decoder make direct API calls from your browser to the AI provider. This bypasses EasyView's backend entirely.
*   **Bring Your Own Key (BYOK) - Morph Proxy:** To protect EasyView's unique intellectual property and proprietary algorithms, the **Morph Engine** requires processing through our secure backend environment. As a result, Morph Engine requests *must* pass through our backend proxy even if you use a personal API key. Your key is passed securely in the request header, used instantaneously for the API call, and dropped. **It is never logged or stored on our servers.**

> [!TIP]
> **Note on Fallback:** If your personal API key fails or runs out of credits, EasyView's smart fallback will temporarily route your request through our Managed Server to ensure an uninterrupted experience, deducting from your EasyView quota instead.

---

## 🛡️ What We Collect (Via Supabase)

If you create an account, we securely collect:
- Your Email Address (via OAuth)
- Subscription Payment Status (via Stripe/Razorpay)
- Anonymous Usage Analytics (e.g., "Jargon Decoder Used", no page text is saved)

> [!IMPORTANT]
> **We NEVER collect:**
> - Your browsing history
> - Your personal API keys
> - The text you highlight to read or decode

---

## ⚙️ Your Control

You have complete control over your data:
1. **API Key**: Delete it from the Settings UI at any time.
2. **Account Deletion**: Contact support at easyview.support@gmail.com to permanently delete your account and all associated data under GDPR/CCPA.
3. **Uninstall**: Uninstalling the extension completely wipes all locally cached settings.

---

<div align="center">
  <em>Last Updated: May 2026</em>
  <br><br>
  <a href="https://easyview.in/privacy-policy">Official Full Privacy Policy</a> • <a href="mailto:easyview.support@gmail.com">Contact Data Protection</a>
</div>
