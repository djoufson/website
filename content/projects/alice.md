## The Problem

Access to quality healthcare remains a significant challenge in many parts of Africa. Patients often struggle to find qualified doctors in a timely manner, and the traditional model of in-person-only consultations creates barriers for those in remote areas or with limited mobility.

## The Solution

Alice Care is a SaaS platform that bridges the gap between patients and qualified healthcare professionals through online consultations. The platform enables patients to find doctors, book appointments, and consult remotely via audio/video calls — all from their phone or browser.

## Architecture

The system is built as a cross-platform solution:

- **Backend** — ASP.NET Core API with SQL Server, handling authentication, appointment scheduling, and real-time communication
- **Mobile** — .NET MAUI for native cross-platform mobile experience (iOS & Android)
- **Web** — Next.js frontend for browser-based access
- **Real-time** — SignalR for in-app messaging and call signaling

```csharp
// Example: Real-time notification hub
public class ConsultationHub : Hub
{
    public async Task NotifyDoctor(string doctorId, string message)
    {
        await Clients.User(doctorId).SendAsync("NewConsultation", message);
    }
}
```

## Current Status

Alice Care is actively being built. The core features — user registration, doctor profiles, appointment booking, and real-time messaging — are functional. Audio/video call integration across both mobile and web clients is the current focus area.
