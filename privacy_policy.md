# EasyPage Privacy Policy - API Key Storage

## 🔒 Privacy-First Approach

EasyPage is designed with your privacy as the top priority. We implement a strict separation between sensitive data and user preferences.

## API Key Storage

### **Local-Only Storage** ✅

Your OpenRouter API key is stored using `chrome.storage.local`, which means:

- ✅ **Never syncs** to any cloud service
- ✅ **Device-only** - stays on your computer
- ✅ **No transmission** - never leaves your device
- ✅ **Private** - not accessible by other extensions or websites
- ✅ **Secure** - uses Chrome's encrypted storage

**Technical Implementation:**
```javascript
// API keys are saved to local storage only
await chrome.storage.local.set({ apiKey });

// And retrieved from local storage
const { apiKey } = await chrome.storage.local.get('apiKey');
```

## User Preferences Storage

### **Sync Storage** (Optional)

User preferences (feature toggles, intensity settings, etc.) use `chrome.storage.sync`, which:

- ✅ Syncs across your Chrome browsers (if signed in to Chrome)
- ✅ **Does NOT include API keys**
- ✅ Only includes feature settings (dyslexia options, TTS speed, etc.)
- ✅ Can be disabled by signing out of Chrome

**What syncs:**
- Feature toggles (Jargon Decoder, Sensory Shield, etc.)
- Dyslexia font preferences
- Text-to-speech settings
- UI preferences

**What NEVER syncs:**
- OpenRouter API keys
- AI model responses
- Browsing history
- Page content

## Future Premium Features

In the future, when premium features are added, you will have the **option** to:

- Sync API keys across devices (optional, opt-in only)
- Store API keys in our secure cloud (encrypted)
- Share configurations with team members

**This will ALWAYS be:**
- ✅ Optional (disabled by default)
- ✅ Explicit consent required
- ✅ Encrypted end-to-end
- ✅ Yours to control

## Data We Collect

### **Currently: NONE** ✅

We do not collect, store, or transmit:
- Personal information
- Browsing history
- API keys
- AI-generated content
- Usage analytics

### **API Communication**

When you use AI features, your browser communicates directly with:
- **OpenRouter API** (for AI processing)

This communication:
- Goes directly from your browser to OpenRouter
- Does NOT pass through our servers
- Is secured with HTTPS
- Follows OpenRouter's privacy policy

## Your Control

You have complete control over your data:

1. **API Key**: Stored only on your device
2. **Delete Data**: Uninstall extension to remove all data
3. **View Data**: Inspect using Chrome DevTools → Application → Storage
4. **Export Settings**: (coming soon)

## Questions?

If you have any privacy concerns or questions:
- Open an issue on GitHub
- Review the source code (fully open source)
- Contact us at [your contact method]

---

**Last Updated:** January 9, 2026

**Version:** 1.0.0

**Privacy Guarantee:** We will never sell, share, or monetize your personal data. Period.
