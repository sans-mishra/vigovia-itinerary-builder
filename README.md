# Itinerary Builder & PDF Generator (Vigovia Frontend Assignment)

This project is a single-page **React** application built to meet the technical and aesthetic specifications of the Vigovia frontend assignment. It allows users to input complex multi-day travel details and instantly generate a high-fidelity, client-side PDF document that precisely replicates the required Figma design.

## 🏆 Key Achievements

### 1. Design Fidelity (Aesthetic Match)

The user interface and the final PDF output achieve maximum visual fidelity with the provided Figma screenshots.

* **Styled UI:** Built with **React** and **Tailwind CSS** for a responsive, modern, and aesthetic input experience.
* **PDF Design Replication (Crucial):** The document is generated using **`jspdf`** and custom rendering logic to draw precise, structured, and color-coded blocks (dark purple headers, light purple background boxes, and custom table layouts) that match the requested design structure.

### 2. Core Functionality

* **Client-Side PDF Generation (Core Requirement):** The app generates a structured, multi-page PDF entirely in the browser (client-side), fulfilling the assignment's main technical constraint.
* **Dynamic Form Management:** The React state efficiently handles dynamically adding and removing complex nested components like **Daily Activities**, **Flights**, **Hotels**, and **Payment Installments**.
* **Data Integrity:** Captures all required itinerary details, notes, inclusion summaries, and payment structures.

### 3. Technologies Used

* **Frontend Framework:** React (Vite)
* **Styling:** Tailwind CSS
* **PDF Generation:** `jspdf`
* **Icons:** `lucide-react`

---

## ⚙️ Local Setup and Installation

1.  **Clone the repository:**
   ```bash
    git clone [https://github.com/sans-mishra/vigovia-itinerary-builder.git](https://github.com/sans-mishra/vigovia-itinerary-builder.git)
    cd vigovia-itinerary-builder
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the application:**
    ```bash
    npm run dev
    ```
    The application will run locally at `http://localhost:5173/`.
