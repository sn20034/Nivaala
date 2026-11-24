# Nivaala — Hostel ka khana, ab ghar jaisa.

A complete **frontend-only** React app for Nivaala, a hostel/PG home-style veg food brand. Everything works in **mock mode** (in-memory + localStorage) so you can test the full UI right now. A single env flag switches to your Spring Boot REST + JWT backend.

## Tech stack

- React 18 + Vite (JavaScript / JSX)
- Tailwind CSS (custom theme, light/dark mode)
- React Router v6
- Framer Motion (animations)
- Lucide React (icons)
- React Hot Toast (notifications)
- React Hook Form (form validation)
- Axios (HTTP client)
- date-fns (date formatting)

## Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build
```

## Mock mode (default)

The app ships with a full mock layer in `src/api/mock/`:
- `mockDb.js` — seed data (users, plans, menu, orders, skips, etc.) persisted to localStorage.
- `mockHandlers.js` — simulates every API endpoint.

**Demo accounts:**
- Student: `student@nivaala.com` / `123456`
- Admin: `admin@nivaala.com` / `123456`

## Connecting your Spring Boot backend

1. Set `VITE_USE_MOCK=false` in `.env`.
2. Set `VITE_API_BASE_URL` to your API base (e.g. `http://localhost:8080/api`).
3. Every service function in `src/services/` already checks the `VITE_USE_MOCK` flag and calls axios (via `src/api/axiosClient.js`) when mock is off. No component changes needed.
4. The axios client automatically attaches `Authorization: Bearer <token>` from localStorage and redirects to `/login` on 401.

### CORS on your Spring Boot side

Allow the frontend origin in your Spring Security / CORS config:

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/api/**")
      .allowedOrigins("http://localhost:5173")
      .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
      .allowedHeaders("*")
      .allowCredentials(true);
  }
}
```

### JWT

The frontend stores the JWT in `localStorage` under `nivaala_token` and sends it as `Authorization: Bearer <token>`. Your Spring Boot auth controller should return:

```json
{ "token": "<jwt>", "user": { "id": "...", "fullName": "...", "email": "...", "phone": "...", "role": "STUDENT|ADMIN", "boxName": "..." } }
```

## API contract

All endpoint URLs are in `src/api/endpoints.js`. Expected response shapes (camelCase JSON, ISO dates) are documented as JSDoc typedefs in each service file. See the project prompt for the full contract.

## Project structure

```
src/
  main.jsx               # entry point
  App.jsx                # providers + router
  routes/                # AppRoutes, ProtectedRoute, routePaths
  api/                   # axiosClient, endpoints, mock/
  services/              # one file per domain (auth, menu, plan, order, skip, student, kitchen, hostel, admin, feedback)
  context/               # AuthContext, ThemeContext
  hooks/                 # useAuth, useTheme, useFetch, useSkipRequests, useDebounce
  components/
    layout/              # Navbar, Footer, Sidebar, DashboardLayout, PublicLayout, WhatsAppFloat
    cards/               # MealCard, PlanCard, StatCard, NameBoxCard, ComparisonCard, TrailCard, TestimonialCard, KitchenClipCard, RequestCard
    ui/                  # Button, Input, Modal, Drawer, Tabs, Accordion, Badge, Skeleton, EmptyState, ThemeToggle, Table, Stepper, Marquee
    forms/               # LoginForm, SignupForm, OrderStepper, HostelLeadForm
    ErrorBoundary.jsx
  pages/
    public/              # Home, Login, Signup, Menu, Kitchen, Plans, Hostels, HowItWorks, Order, NotFound, Unauthorized
    student/             # Dashboard, SkipPause, MyPlan, Orders, Profile
    admin/               # Dashboard, Students, Skips, MenuManager, PlansManager, Orders, KitchenFeed, Hostels, Feedback
  utils/                 # constants, dateHelpers, cutoffRules, validators
  styles/                # index.css (CSS variables, Tailwind layers)
public/images/           # placeholder images
```

## Notes

- Placeholder images use emoji icons with TODO comments — replace with real photos in `public/images/`.
- The FSSAI licence number in the footer/kitchen page is a placeholder.
- Skip cut-off time is a constant in `src/utils/constants.js` (`SKIP_CUTOFF_HOUR = 21`).
- The admin dashboard uses a lightweight SVG bar chart (no recharts dependency needed).
