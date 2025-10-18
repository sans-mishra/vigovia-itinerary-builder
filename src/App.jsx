import React, { useState } from 'react';
import { Download, Plus, Trash2, Calendar, MapPin, Plane, Sun, Cloud, Moon, Hotel, List, DollarSign, FileText, CheckCircle, Clock } from 'lucide-react';

// --- Helper Components for the Form UI ---

// Input field component
const InputField = ({ label, value, onChange, placeholder, type = "text", className = "" }) => (
    <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-4 py-2 border border-gray-200 rounded-lg bg-white shadow-inner focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ${className}`}
        />
    </div>
);

// Textarea field component
const TextareaField = ({ label, value, onChange, placeholder, rows = 3 }) => (
    <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
        <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white shadow-inner focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
        />
    </div>
);

// Dynamic Row Container - Enhanced header separation
const DynamicSection = ({ title, icon: Icon, onAdd, children, headerClass = "" }) => (
    <div className="mb-8 p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className={`flex items-center justify-between mb-6 border-b border-blue-100 pb-4 ${headerClass}`}>
            <h3 className="text-2xl font-extrabold text-gray-800 flex items-center gap-3">
                <Icon className="text-indigo-600" size={24} />
                {title}
            </h3>
            {onAdd && (
                <button
                    onClick={onAdd}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition duration-150 shadow-md transform hover:shadow-lg"
                >
                    <Plus size={16} />
                    Add {title.split(' ')[0]}
                </button>
            )}
        </div>
        {children}
    </div>
);


const ItineraryBuilder = () => {
    const [formData, setFormData] = useState({
        userName: 'Rahul',
        destination: 'Singapore',
        tripTitle: 'Singapore Itinerary',
        duration: '4 Days 3 Nights',
        departureFrom: 'Mumbai',
        departureDate: '31/10/2025',
        arrivalDate: '01/11/2025',
        numTravelers: '3',
        days: [
            {
                date: '27th November',
                title: 'Arrival In Singapore & City Exploration',
                imageUrl: 'https://placehold.co/64x64/3c83b8/ffffff?text=D1',
                activities: {
                    morning: 'Arrive In Singapore. Transfer From Airport To Hotel.\nCheck Into Your Hotel.',
                    afternoon: 'Visit Marina Bay Sands Sky Park (2-3 Hours).\nOptional: Stroll Along Marina Bay Waterfront Promenade Or Helix Bridge.',
                    evening: 'Explore Gardens By The Bay, Including Super Tree Grove (3-4 Hours)',
                }
            },
        ],
        flights: [
            { date: 'Thu 10 Jan\'24', flight: 'Fly Air India (AX-123) From Delhi (DEL) To Singapore (SIN).' }
        ],
        hotels: [
            {
                city: 'Singapore',
                hotelName: 'Super Townhouse Oak Vashi Formerly Blue Diamond',
                checkIn: '24/02/2024',
                checkOut: '24/02/2024',
                nights: '2'
            }
        ],
        activities: [
            {
                city: 'Rio De Janeiro',
                activity: 'Sydney Harbour Cruise & Taronga Zoo',
                type: 'Nature/Sightseeing',
                timeRequired: '2-3 Hours',
                status: 'Awaiting Confirmation'
            }
        ],
        paymentPlan: {
            totalAmount: '₹9,00,000 For 3 Pax (Inclusive Of GST)',
            tcs: 'Not Collected',
            installments: [
                { name: 'Installment 1', amount: '₹3,50,000', dueDate: 'Initial Payment' },
                { name: 'Installment 2', amount: '₹4,00,000', dueDate: 'Post Visa Approval' }
            ]
        },
        importantNotes: [
            { point: 'Airlines Standard Policy', details: 'In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any Cost.' },
            { point: 'Flight/Hotel Cancellation', details: 'In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any Cost.' },
            { point: 'Hotel CheckIn & Check Out', details: 'In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any Cost.' },
        ],
        scopeOfService: [
            { service: 'Flight Tickets And Hotel Vouchers', details: 'Delivered 3 Days Post Full Payment' },
            { service: 'Web CheckIn', details: 'Boarding Pass Delivery Via Email/WhatsApp' },
            { service: 'Support', details: 'Chat Support - Response Time: 4 Hours' },
        ],
        inclusionSummary: [
            { category: 'Flight', count: '2', details: 'All Flights Mentioned', status: 'Awaiting Confirmation' },
            { category: 'Tourist Tax', count: '2', details: 'Yotel (Singapore), Oakwood (Sydney), Mercure (Cairns), Novotel (Gold Coast), Holiday Inn (Melbourne)', status: 'Awaiting Confirmation' },
            { category: 'Hotel', count: '2', details: 'Airport To Hotel - Hotel To Attractions - Day Trips If Any', status: 'Included' },
        ],
        visaDetails: [
            { visaType: '123456', validity: '123456', processingDate: '123456' }
        ]
    });

    // --- State Management Helpers (Partial inclusion to keep file clean) ---
    const addDay = () => setFormData(prev => ({ ...prev, days: [...prev.days, { date: '', title: '', imageUrl: 'https://placehold.co/64x64/505050/ffffff?text=New', activities: { morning: '', afternoon: '', evening: '' } }] }));
    const removeDay = (index) => setFormData(prev => ({ ...prev, days: prev.days.filter((_, i) => i !== index) }));
    const updateDay = (index, field, value) => setFormData(prev => ({
        ...prev, days: prev.days.map((day, i) => i === index ? { ...day, [field]: value } : day)
    }));
    const updateActivity = (dayIndex, period, value) => setFormData(prev => ({
        ...prev, days: prev.days.map((day, i) =>
            i === dayIndex ? { ...day, activities: { ...day.activities, [period]: value } } : day
        )
    }));
    const addHotel = () => setFormData(prev => ({ ...prev, hotels: [...prev.hotels, { city: '', hotelName: '', checkIn: '', checkOut: '', nights: '' }] }));
    const removeHotel = (index) => setFormData(prev => ({ ...prev, hotels: prev.hotels.filter((_, i) => i !== index) }));
    const updateHotel = (index, field, value) => setFormData(prev => ({
        ...prev, hotels: prev.hotels.map((hotel, i) => i === index ? { ...hotel, [field]: value } : hotel)
    }));
    const addFlight = () => setFormData(prev => ({ ...prev, flights: [...prev.flights, { date: '', flight: '' }] }));
    const removeFlight = (index) => setFormData(prev => ({ ...prev, flights: prev.flights.filter((_, i) => i !== index) }));
    const updateFlight = (index, field, value) => setFormData(prev => ({
        ...prev, flights: prev.flights.map((flight, i) => i === index ? { ...flight, [field]: value } : flight)
    }));
    const addActivityItem = () => setFormData(prev => ({ ...prev, activities: [...prev.activities, { city: '', activity: '', type: '', timeRequired: '', status: '' }] }));
    const removeActivityItem = (index) => setFormData(prev => ({ ...prev, activities: prev.activities.filter((_, i) => i !== index) }));
    const updateActivityItem = (index, field, value) => setFormData(prev => ({
        ...prev, activities: prev.activities.map((activity, i) => i === index ? { ...activity, [field]: value } : activity)
    }));
    const addInstallment = () => setFormData(prev => ({
        ...prev, paymentPlan: { ...prev.paymentPlan, installments: [...prev.paymentPlan.installments, { name: `Installment ${prev.paymentPlan.installments.length + 1}`, amount: '', dueDate: '' }] }
    }));
    const removeInstallment = (index) => setFormData(prev => ({
        ...prev, paymentPlan: { ...prev.paymentPlan, installments: prev.paymentPlan.installments.filter((_, i) => i !== index) }
    }));
    const updateInstallment = (index, field, value) => setFormData(prev => ({
        ...prev, paymentPlan: { ...prev.paymentPlan, installments: prev.paymentPlan.installments.map((inst, i) => i === index ? { ...inst, [field]: value } : inst) }
    }));
    const updateNote = (index, field, value) => setFormData(prev => ({
        ...prev, importantNotes: prev.importantNotes.map((note, i) => i === index ? { ...note, [field]: value } : note)
    }));
    const addNote = () => setFormData(prev => ({
        ...prev, importantNotes: [...prev.importantNotes, { point: '', details: '' }]
    }));
    const removeNote = (index) => setFormData(prev => ({
        ...prev, importantNotes: prev.importantNotes.filter((_, i) => i !== index)
    }));
    const updateScope = (index, field, value) => setFormData(prev => ({
        ...prev, scopeOfService: prev.scopeOfService.map((scope, i) => i === index ? { ...scope, [field]: value } : scope)
    }));
    const addScope = () => setFormData(prev => ({
        ...prev, scopeOfService: [...prev.scopeOfService, { service: '', details: '' }]
    }));
    const removeScope = (index) => setFormData(prev => ({
        ...prev, scopeOfService: prev.scopeOfService.filter((_, i) => i !== index)
    }));
    
    // --- PDF Generation Logic ---
    const drawImagePlaceholder = (pdf, x, y, size, fillText) => {
        pdf.setFillColor(60, 60, 60);
        pdf.circle(x, y, size / 2, 'F');
        // Add text inside
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.text(fillText, x, y + 1, { align: 'center' });
    }
    
    const generatePDF = async () => {
        if (typeof window.jspdf === 'undefined') {
            console.error("jsPDF library not loaded.");
            return;
        }

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = 210;
        const pageHeight = 297;
        const margin = 15;
        const headerHeight = 8;
        let yPos = margin;
        
        // Custom Colors from Figma Screenshots
        const PRIMARY_COLOR = [41, 128, 185]; // Dark Blue
        const DARK_GRAY = [44, 62, 80];        // Very Dark Gray for text
        const LIGHT_GRAY = [240, 240, 240];    // Very Light Gray for boxes
        const PURPLE_HEADER = [54, 43, 73]; // Dark Purple 
        const LIGHT_PURPLE_BG = [235, 225, 240]; // Light Purple (for text boxes)

        const LINE_HEIGHT_SM = 4;
        const LINE_HEIGHT_MD = 6;
        
        const checkPageOverflow = (neededSpace) => {
            if (yPos + neededSpace > pageHeight - margin) {
                pdf.addPage();
                yPos = margin + 10;
            }
        };
        const drawHorizontalLine = (y, color = [200, 200, 200]) => {
            pdf.setDrawColor(...color);
            pdf.setLineWidth(0.2);
            pdf.line(margin, y, pageWidth - margin, y);
        }

        // --- PDF Header ---
        
        pdf.setFillColor(41, 128, 185); // Blue for header
        pdf.rect(0, 0, pageWidth, 40, 'F');

        // Main Brand Logo/Text
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(28);
        pdf.setFont('helvetica', 'bold');
        pdf.text('vigovia', margin, 20);

        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.text('PLAN.PACK.GO', margin, 27);

        // Trip Info
        pdf.setFontSize(20);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`Hi, ${formData.userName}!`, pageWidth - margin, 20, { align: 'right' });

        pdf.setFontSize(16);
        pdf.text(formData.tripTitle, pageWidth - margin, 28, { align: 'right' });

        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.text(formData.duration, pageWidth - margin, 35, { align: 'right' });

        yPos = 50;

        // --- Trip Overview Box (Replicating Figma Style - Lighter Gray) ---
        
        checkPageOverflow(35);
        pdf.setFillColor(...LIGHT_GRAY);
        const overviewBoxHeight = 35;
        pdf.roundedRect(margin, yPos, pageWidth - 2 * margin, overviewBoxHeight, 3, 3, 'F');

        pdf.setTextColor(...DARK_GRAY);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');

        let overviewY = yPos + 8;
        const col1Start = margin + 5;
        const col2Start = margin + 50;
        const col3Start = pageWidth - margin - 60;
        const col4Start = pageWidth - margin - 5;

        pdf.text('Departure From:', col1Start, overviewY);
        pdf.text('Destination:', col1Start, overviewY + 7);
        pdf.text('Departure:', col1Start, overviewY + 14);
        pdf.text('Arrival:', col1Start, overviewY + 21);

        pdf.setFont('helvetica', 'normal');
        pdf.text(formData.departureFrom, col2Start, overviewY);
        pdf.text(formData.destination, col2Start, overviewY + 7);
        pdf.text(formData.departureDate, col2Start, overviewY + 14);
        pdf.text(formData.arrivalDate, col2Start, overviewY + 21);

        pdf.setFont('helvetica', 'bold');
        pdf.text('No. Of Travellers:', col3Start, overviewY + 14);

        pdf.setFont('helvetica', 'normal');
        pdf.text(formData.numTravelers, col4Start, overviewY + 14, { align: 'right' });

        yPos += overviewBoxHeight + 10;

        // --- Daily Itinerary ---

        formData.days.forEach((day, dayIndex) => {
            
            checkPageOverflow(65);
            const dayBlockX = margin;
            const dayBlockWidth = pageWidth - 2 * margin;
            const dayBlockY = yPos;
            const dayBlockContentX = dayBlockX + 15;
            
            // Calculate content height dynamically based on activities
            const activityLines = Object.values(day.activities).flatMap(a => pdf.splitTextToSize(a, 100)); // Max lines in one period
            const activitySectionHeight = activityLines.length * 5 + 10;
            const minBlockHeight = 55;
            const currentBlockHeight = Math.max(minBlockHeight, activitySectionHeight);

            // --- 1. Day Number Pill (Left side - Dark Purple) ---
            pdf.setFillColor(PURPLE_HEADER[0], PURPLE_HEADER[1], PURPLE_HEADER[2]);
            pdf.roundedRect(dayBlockX, dayBlockY, 10, currentBlockHeight, 3, 3, 'F');

            // Day Label
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'bold');
            pdf.text(`DAY ${dayIndex + 1}`, dayBlockX + 5, dayBlockY + currentBlockHeight / 2, { align: 'center', angle: 90 });
            
            // --- 2. Main Content Box (White) ---
            pdf.setFillColor(255, 255, 255);
            pdf.roundedRect(dayBlockX + 10, dayBlockY, dayBlockWidth - 10, currentBlockHeight, 3, 3, 'F');
            pdf.setDrawColor(200, 200, 200);
            pdf.roundedRect(dayBlockX + 10, dayBlockY, dayBlockWidth - 10, currentBlockHeight, 3, 3, 'S');

            pdf.setTextColor(...DARK_GRAY);
            pdf.setFontSize(10);
            
            // Day Date
            pdf.setFont('helvetica', 'bold');
            pdf.text(day.date, dayBlockContentX, dayBlockY + 8);
            
            // Day Title
            pdf.setFontSize(11);
            pdf.text(day.title, dayBlockContentX, dayBlockY + 14);
            
            // Placeholder Image Circle 
            const IMAGE_SIZE = 20;
            drawImagePlaceholder(pdf, dayBlockContentX + 25, dayBlockY + 35, IMAGE_SIZE, "IMG");
            
            // --- 3. Activities Section (Right side of the block) ---
            let activityStartCol = dayBlockX + 80;
            let activityY = dayBlockY + 8;
            
            const periods = [
                { label: 'Morning', content: day.activities.morning },
                { label: 'Afternoon', content: day.activities.afternoon },
                { label: 'Evening', content: day.activities.evening }
            ];

            pdf.setFontSize(8);
            periods.forEach(period => {
                // Period Label (Bold)
                pdf.setFont('helvetica', 'bold');
                pdf.text(period.label, activityStartCol, activityY);
                
                // Content (Normal, Wrapped)
                pdf.setFont('helvetica', 'normal');
                const lines = pdf.splitTextToSize(period.content, pageWidth - activityStartCol - margin - 5);
                
                let currentLineY = activityY;
                lines.forEach(line => {
                    pdf.text(line, activityStartCol + 20, currentLineY);
                    currentLineY += LINE_HEIGHT_SM;
                });
                activityY = currentLineY + 1; // Add small spacing between periods
            });
            
            yPos += currentBlockHeight + 5; 
        });
        
        yPos += 5;

        // --- Flight Summary (Similar to Screenshot) ---
        if (formData.flights.length > 0) {
            checkPageOverflow(20 + (formData.flights.length * 10));

            pdf.setFillColor(...PRIMARY_COLOR);
            pdf.rect(margin, yPos, pageWidth - 2 * margin, 8, 'F');
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(12);
            pdf.setFont('helvetica', 'bold');
            pdf.text('Flight Summary', margin + 3, yPos + 5.5);

            yPos += 12;

            pdf.setTextColor(...DARK_GRAY);
            pdf.setFontSize(9);

            formData.flights.forEach((flight, idx) => {
                checkPageOverflow(10);
                const currentY = yPos;
                const rowHeight = 8;
                
                // Flight Box Background (White with light border)
                pdf.setFillColor(255, 255, 255);
                pdf.rect(margin, currentY, pageWidth - 2 * margin, rowHeight, 'F');
                pdf.setDrawColor(200, 200, 200);
                pdf.rect(margin, currentY, pageWidth - 2 * margin, rowHeight, 'S');

                // Date Pill (Dark Purple)
                pdf.setFillColor(PURPLE_HEADER[0], PURPLE_HEADER[1], PURPLE_HEADER[2]);
                pdf.rect(margin, currentY, 30, rowHeight, 'F'); 
                
                pdf.setTextColor(255, 255, 255);
                pdf.setFont('helvetica', 'bold');
                pdf.text(flight.date, margin + 2, currentY + 4.5);
                
                // Flight Details
                pdf.setTextColor(...DARK_GRAY);
                pdf.setFont('helvetica', 'normal');
                pdf.text(flight.flight, margin + 35, currentY + 4.5);
                yPos += rowHeight;
            });
            yPos += 5;
        }
        
        // Add Note on Flights (from screenshot)
        pdf.setFontSize(8);
        pdf.setTextColor(100, 100, 100);
        pdf.text("Note: All Flights Include Meals, Seat Choice (Excluding XL), And 20kg/25Kg Checked Baggage.", margin, yPos);
        yPos += 10;


        // --- Hotel Bookings (Simulated Horizontal Header Blocks) ---
        
        if (formData.hotels.length > 0) {
            checkPageOverflow(20 + (formData.hotels.length * 10));

            pdf.setFillColor(...PRIMARY_COLOR);
            pdf.rect(margin, yPos, pageWidth - 2 * margin, 8, 'F');
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(12);
            pdf.setFont('helvetica', 'bold');
            pdf.text('Hotel Bookings', margin + 3, yPos + 5.5);

            yPos += 12;
            
            // Hotel Table Headers
            const headerData = [
                { label: 'City', width: 25 },
                { label: 'Check In', width: 25 },
                { label: 'Check Out', width: 25 },
                { label: 'Nights', width: 20 },
                { label: 'Hotel Name', width: pageWidth - 2 * margin - 95 }
            ];
            
            const headerHeight = 8;
            let headerX = margin;

            // Draw separate purple blocks for headers
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(8);

            headerData.forEach(h => {
                pdf.setFillColor(PURPLE_HEADER[0], PURPLE_HEADER[1], PURPLE_HEADER[2]);
                pdf.roundedRect(headerX, yPos, h.width, headerHeight, 1, 1, 'F');
                pdf.text(h.label, headerX + h.width / 2, yPos + 4, { align: 'center' });
                headerX += h.width + 1; // Add 1mm gap between blocks for separation
            });
            
            yPos += headerHeight + 2; // Spacing after headers
            
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(...DARK_GRAY);
            pdf.setFontSize(8);
            
            formData.hotels.forEach((hotel, idx) => {
                checkPageOverflow(15);
                const currentY = yPos;
                
                const hotelNameLines = pdf.splitTextToSize(hotel.hotelName, headerData[4].width - 4);
                const rowHeight = Math.max(10, hotelNameLines.length * LINE_HEIGHT_SM + 2);

                // Draw bounding box for the whole row
                pdf.setDrawColor(200, 200, 200);
                pdf.rect(margin, currentY, pageWidth - 2 * margin, rowHeight, 'S');
                
                // Draw cells
                const colStarts = [margin, margin + 26, margin + 52, margin + 78, margin + 99];

                pdf.text(hotel.city, colStarts[0] + 2, currentY + 3);
                pdf.text(hotel.checkIn, colStarts[1] + 2, currentY + 3);
                pdf.text(hotel.checkOut, colStarts[2] + 2, currentY + 3);
                pdf.text(hotel.nights, colStarts[3] + 2, currentY + 3);

                let nameY = currentY + 3;
                hotelNameLines.forEach(line => {
                    pdf.text(line, colStarts[4] + 2, nameY);
                    nameY += LINE_HEIGHT_SM;
                });
                

                yPos += rowHeight;
            });
            yPos += 5;
            
            // Add Hotel Notes
            pdf.setFontSize(8);
            pdf.setTextColor(100, 100, 100);
            pdf.text("1. All Hotels Are Tentative And Can Be Replaced With Similar. 2. Breakfast Included For All Hotel Stays. 3. All Hotels Will Be 4 And Above Category. 4. A maximum occupancy of 2 people/room is allowed in most hotels.", margin, yPos);
            yPos += 15;
        }

        // --- Activities Table ---
        
        if (formData.activities.length > 0) {
            checkPageOverflow(20 + (formData.activities.length * 10));

            pdf.setFillColor(...PRIMARY_COLOR);
            pdf.rect(margin, yPos, pageWidth - 2 * margin, 8, 'F');
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(12);
            pdf.setFont('helvetica', 'bold');
            pdf.text('Activity Table', margin + 3, yPos + 5.5);

            yPos += 12;
            
            const activityHeaders = ['City', 'Activity', 'Type', 'Time Required'];
            const activityData = [
                { label: 'City', width: 30 },
                { label: 'Activity', width: 50 },
                { label: 'Type', width: 35 },
                { label: 'Time Required', width: 30 }
            ];
            
            let activityHeaderX = margin;
            
            // Draw simulated column headers for Activities (Dark Purple)
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(8);
            
            activityData.forEach(h => {
                pdf.setFillColor(PURPLE_HEADER[0], PURPLE_HEADER[1], PURPLE_HEADER[2]);
                pdf.roundedRect(activityHeaderX, yPos, h.width, headerHeight, 1, 1, 'F');
                pdf.text(h.label, activityHeaderX + h.width / 2, yPos + 4, { align: 'center' });
                activityHeaderX += h.width + 1;
            });

            yPos += headerHeight + 2;
            
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(...DARK_GRAY);
            pdf.setFontSize(8);
            
            formData.activities.forEach((activity, idx) => {
                checkPageOverflow(8);
                
                const currentY = yPos;
                const rowHeight = 7;
                
                // Draw row outline
                pdf.setDrawColor(200, 200, 200);
                pdf.rect(margin, currentY, pageWidth - 2 * margin, rowHeight, 'S');

                const colStarts = [margin, margin + 31, margin + 82, margin + 118];

                pdf.text(activity.city, colStarts[0] + 2, currentY + 4);
                pdf.text(activity.activity, colStarts[1] + 2, currentY + 4);
                pdf.text(activity.type, colStarts[2] + 2, currentY + 4);
                pdf.text(activity.timeRequired, colStarts[3] + 2, currentY + 4);

                yPos += rowHeight;
            });
            drawHorizontalLine(yPos);
            yPos += 10;
        }
        
        // --- Important Notes ---
        checkPageOverflow(40);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(...DARK_GRAY);
        pdf.text('Important Notes', margin, yPos);
        yPos += 5;
        
        const notesColWidths = [35, pageWidth - 2 * margin - 35 - 5];

        formData.importantNotes.forEach((note, idx) => {
            checkPageOverflow(15);
            const currentY = yPos;
            
            // Draw dark purple header for "Point" column
            pdf.setFillColor(PURPLE_HEADER[0], PURPLE_HEADER[1], PURPLE_HEADER[2]);
            pdf.roundedRect(margin, currentY, notesColWidths[0], 10, 2, 2, 'F');
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'bold');
            
            const pointLines = pdf.splitTextToSize(note.point, notesColWidths[0] - 4);
            let pointY = currentY + 2;
            pointLines.forEach(line => {
                pdf.text(line, margin + 2, pointY);
                pointY += LINE_HEIGHT_SM;
            });
            
            // Draw details box (Light Purple)
            const detailX = margin + notesColWidths[0] + 5;
            const detailLines = pdf.splitTextToSize(note.details, notesColWidths[1] - 4);
            const detailBoxHeight = Math.max(10, detailLines.length * LINE_HEIGHT_SM + 4);

            pdf.setFillColor(LIGHT_PURPLE_BG[0], LIGHT_PURPLE_BG[1], LIGHT_PURPLE_BG[2]);
            pdf.roundedRect(detailX, currentY, notesColWidths[1], detailBoxHeight, 2, 2, 'F');
            pdf.setTextColor(...DARK_GRAY);
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'normal');
            
            let detailY = currentY + 2;
            detailLines.forEach(line => {
                pdf.text(line, detailX + 2, detailY);
                detailY += LINE_HEIGHT_SM;
            });

            yPos += detailBoxHeight + 2;
        });
        yPos += 5;
        
        // --- Scope of Service ---
        checkPageOverflow(40);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(...DARK_GRAY);
        pdf.text('Scope Of Service', margin, yPos);
        yPos += 5;
        
        formData.scopeOfService.forEach((scope, idx) => {
            checkPageOverflow(15);
            const currentY = yPos;
            
            // Draw dark purple header for "Service" column
            pdf.setFillColor(PURPLE_HEADER[0], PURPLE_HEADER[1], PURPLE_HEADER[2]);
            pdf.roundedRect(margin, currentY, notesColWidths[0], 10, 2, 2, 'F');
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'bold');
            
            const serviceLines = pdf.splitTextToSize(scope.service, notesColWidths[0] - 4);
            let serviceY = currentY + 2;
            serviceLines.forEach(line => {
                pdf.text(line, margin + 2, serviceY);
                serviceY += LINE_HEIGHT_SM;
            });
            
            // Draw details box (Light Purple)
            const detailX = margin + notesColWidths[0] + 5;
            const detailLines = pdf.splitTextToSize(scope.details, notesColWidths[1] - 4);
            const detailBoxHeight = Math.max(10, detailLines.length * LINE_HEIGHT_SM + 4);

            pdf.setFillColor(LIGHT_PURPLE_BG[0], LIGHT_PURPLE_BG[1], LIGHT_PURPLE_BG[2]);
            pdf.roundedRect(detailX, currentY, notesColWidths[1], detailBoxHeight, 2, 2, 'F');
            pdf.setTextColor(...DARK_GRAY);
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'normal');
            
            let detailY = currentY + 2;
            detailLines.forEach(line => {
                pdf.text(line, detailX + 2, detailY);
                detailY += LINE_HEIGHT_SM;
            });

            yPos += detailBoxHeight + 2;
        });
        yPos += 5;
        
        // --- Inclusion Summary ---
        checkPageOverflow(40);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(...DARK_GRAY);
        pdf.text('Inclusion Summary', margin, yPos);
        yPos += 5;
        
        const inclusionColWidths = [30, 20, 60, 55];
        const inclusionColStarts = [margin, margin + inclusionColWidths[0] + 1, margin + inclusionColWidths[0] + inclusionColWidths[1] + 2, margin + inclusionColWidths[0] + inclusionColWidths[1] + inclusionColWidths[2] + 3];

        // Table Header Row (Dark Purple - Individual Blocks)
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(8);
        
        let inclusionHeaderX = margin;
        const inclusionHeaders = ['Category', 'Count', 'Details', 'Status / Comments'];
        
        inclusionHeaders.forEach((h, index) => {
            const width = inclusionColWidths[index];
            pdf.setFillColor(PURPLE_HEADER[0], PURPLE_HEADER[1], PURPLE_HEADER[2]);
            pdf.roundedRect(inclusionHeaderX, yPos, width, headerHeight, 1, 1, 'F');
            pdf.text(h, inclusionHeaderX + width / 2, yPos + 4, { align: 'center' });
            inclusionHeaderX += width + 1;
        });
        
        yPos += headerHeight + 2;
        
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(...DARK_GRAY);
        pdf.setFontSize(8);
        
        formData.inclusionSummary.forEach((item, idx) => {
            checkPageOverflow(15);
            const currentY = yPos;
            
            const detailLines = pdf.splitTextToSize(item.details, inclusionColWidths[2] - 4);
            const statusLines = pdf.splitTextToSize(item.status, inclusionColWidths[3] - 4);
            
            const contentLines = Math.max(detailLines.length, statusLines.length, 1);
            const rowHeight = contentLines * LINE_HEIGHT_SM + 2; 

            // Draw row outline
            pdf.setDrawColor(200, 200, 200);
            pdf.rect(margin, currentY, pageWidth - 2 * margin, rowHeight, 'S');

            // Category and Count
            pdf.text(item.category, inclusionColStarts[0] + 2, currentY + 3.5);
            pdf.text(item.count, inclusionColStarts[1] + 2, currentY + 3.5);

            // Wrapped Details
            let detailY = currentY + 3.5;
            detailLines.forEach(line => {
                pdf.text(line, inclusionColStarts[2] + 2, detailY);
                detailY += LINE_HEIGHT_SM;
            });
            
            // Wrapped Status
            let statusY = currentY + 3.5;
            statusLines.forEach(line => {
                pdf.text(line, inclusionColStarts[3] + 2, statusY);
                statusY += LINE_HEIGHT_SM;
            });

            yPos += rowHeight;
        });
        drawHorizontalLine(yPos);
        yPos += 5;
        
        // --- Payment Plan ---
        
        checkPageOverflow(50);

        pdf.setFillColor(...PRIMARY_COLOR);
        pdf.rect(margin, yPos, pageWidth - 2 * margin, 8, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Payment Plan', margin + 3, yPos + 5.5);

        yPos += 12;

        pdf.setTextColor(...DARK_GRAY);
        pdf.setFontSize(9);
        
        // Total Amount & TCS (Purple Boxes)
        const paymentDetails = [
            { label: 'Total Amount', value: formData.paymentPlan.totalAmount },
            { label: 'TCS', value: formData.paymentPlan.tcs }
        ];

        let detailY = yPos;
        paymentDetails.forEach((item, index) => {
            // Draw light purple box
            pdf.setFillColor(LIGHT_PURPLE_BG[0], LIGHT_PURPLE_BG[1], LIGHT_PURPLE_BG[2]);
            const boxHeight = 8;
            const boxWidth = (pageWidth - 2 * margin) / 2 - 2;

            pdf.roundedRect(margin + (index * (boxWidth + 4)), detailY, boxWidth, boxHeight, 2, 2, 'F');

            // Label (Bold, Dark Gray, Aligned Left)
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(...DARK_GRAY);
            pdf.text(item.label, margin + (index * (boxWidth + 4)) + 2, detailY + 4.5);
            
            // Value (Normal, Dark Gray, Aligned Right)
            pdf.setFont('helvetica', 'normal');
            pdf.text(item.value, margin + (index * (boxWidth + 4)) + boxWidth - 2, detailY + 4.5, { align: 'right' });
        });
        yPos += 10;
        
        // Installments Header (Dark Purple)
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'bold');
        pdf.setFillColor(PURPLE_HEADER[0], PURPLE_HEADER[1], PURPLE_HEADER[2]);
        const installmentHeaderHeight = 5;
        pdf.rect(margin, yPos, pageWidth - 2 * margin, installmentHeaderHeight, 'F');
        pdf.setTextColor(255, 255, 255);
        
        pdf.text('Installment', margin + 5, yPos + 3.5);
        pdf.text('Amount', margin + 60, yPos + 3.5);
        pdf.text('Due Date', margin + 120, yPos + 3.5);
        yPos += installmentHeaderHeight + 2;
        
        // Installments List
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(...DARK_GRAY);
        
        formData.paymentPlan.installments.forEach((inst, idx) => {
            checkPageOverflow(8);

            // Draw light purple background boxes behind the text for emphasis
            const boxWidths = [50, 50, 60];
            const boxStarts = [margin, margin + 55, margin + 115];
            const boxHeight = 6;
            
            pdf.setFillColor(LIGHT_PURPLE_BG[0], LIGHT_PURPLE_BG[1], LIGHT_PURPLE_BG[2]);
            boxStarts.forEach((start, i) => {
                pdf.rect(start, yPos - 1, boxWidths[i], boxHeight, 'F');
            });
            
            pdf.text(inst.name, margin + 5, yPos + 3.5);
            pdf.text(inst.amount, margin + 60, yPos + 3.5);
            pdf.text(inst.dueDate, margin + 120, yPos + 3.5);
            yPos += LINE_HEIGHT_MD;
        });
        yPos += 5;
        
        // --- Visa Details ---
        checkPageOverflow(30);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(...DARK_GRAY);
        pdf.text('Visa Details', margin, yPos);
        yPos += 5;
        
        const visaHeaders = ['Visa Type:', 'Validity:', 'Processing Date:'];
        const visaColStarts = [margin + 5, margin + 70, margin + 135];
        const visaColWidth = 50;

        formData.visaDetails.forEach(visa => {
            const currentY = yPos;
            // Draw rounded box for visa details
            pdf.setDrawColor(PURPLE_HEADER[0], PURPLE_HEADER[1], PURPLE_HEADER[2]);
            pdf.roundedRect(margin, currentY, pageWidth - 2 * margin, 15, 3, 3, 'S');
            
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(...DARK_GRAY);
            
            // Headers
            pdf.text(visaHeaders[0], visaColStarts[0], currentY + 3);
            pdf.text(visaHeaders[1], visaColStarts[1], currentY + 3);
            pdf.text(visaHeaders[2], visaColStarts[2], currentY + 3);

            // Values
            pdf.setFont('helvetica', 'normal');
            pdf.text(visa.visaType, visaColStarts[0], currentY + 10);
            pdf.text(visa.validity, visaColStarts[1], currentY + 10);
            pdf.text(visa.processingDate, visaColStarts[2], currentY + 10);

            yPos += 20;
        });

        // --- Final Call to Action ---
        checkPageOverflow(20);
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.text("PLAN.PACK.GO!", pageWidth / 2, yPos, { align: 'center' });
        yPos += 8;

        pdf.setFillColor(PURPLE_HEADER[0], PURPLE_HEADER[1], PURPLE_HEADER[2]);
        const buttonWidth = 50;
        const buttonHeight = 10;
        const buttonX = pageWidth / 2 - buttonWidth / 2;
        pdf.roundedRect(buttonX, yPos, buttonWidth, buttonHeight, 3, 3, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(10);
        pdf.text('Book Now', pageWidth / 2, yPos + 6.5, { align: 'center' });
        yPos += 15;


        // --- PDF Footer ---
        pdf.setFillColor(...DARK_GRAY);
        const footerHeight = 25;
        pdf.rect(0, pageHeight - footerHeight, pageWidth, footerHeight, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');

        const footerY = pageHeight - footerHeight + 7;
        const lineHeight = 5;
        
        pdf.text('Vigovia Tech Pvt. Ltd', margin, footerY);
        pdf.text('Registered Office: Hd-109 Cinnabar Hills, Links Business Park, Karnataka, India.', margin, footerY + lineHeight);
        pdf.text('Phone: +91-9504061112 | Email: Utkarsh@Vigovia.Com', margin, footerY + 2 * lineHeight);
        pdf.text('CIN: U79110KA2024PTC191890', margin, footerY + 3 * lineHeight);

        pdf.save(`${formData.destination}_Itinerary.pdf`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-6">
            {/* Load jsPDF library - needed for PDF generation */}
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
                    
                    {/* Top Header - Matches Figma Colors */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 sm:p-10 relative">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-4xl font-bold mb-1">vigovia</h1>
                                <p className="text-blue-100 text-sm">PLAN.PACK.GO</p>
                            </div>
                            <div className="text-right">
                                <h2 className="text-3xl font-extrabold tracking-tight">Itinerary Builder</h2>
                                <p className="text-blue-200 text-sm">Create Your Perfect Trip</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 sm:p-8 space-y-8">
                        
                        {/* Trip Overview Section */}
                        <DynamicSection icon={MapPin} title="Trip Overview">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <InputField label="User Name" value={formData.userName} onChange={(e) => setFormData({ ...formData, userName: e.target.value })} />
                                <InputField label="Trip Title" value={formData.tripTitle} onChange={(e) => setFormData({ ...formData, tripTitle: e.target.value })} />
                                <InputField label="Destination" value={formData.destination} onChange={(e) => setFormData({ ...formData, destination: e.target.value })} />
                                <InputField label="Duration" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} placeholder="e.g., 4 Days 3 Nights" />
                                <InputField label="Departure From" value={formData.departureFrom} onChange={(e) => setFormData({ ...formData, departureFrom: e.target.value })} />
                                <InputField label="Departure Date" value={formData.departureDate} onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })} placeholder="e.g., 31/10/2025" />
                                <InputField label="Arrival Date" value={formData.arrivalDate} onChange={(e) => setFormData({ ...formData, arrivalDate: e.target.value })} placeholder="e.g., 01/11/2025" />
                                <InputField label="No. of Travelers" value={formData.numTravelers} onChange={(e) => setFormData({ ...formData, numTravelers: e.target.value })} placeholder="e.g., 3" />
                            </div>
                        </DynamicSection>

                        {/* Daily Itinerary Section */}
                        <DynamicSection icon={Calendar} title="Daily Itinerary" onAdd={addDay}>
                            <div className="space-y-6">
                                {formData.days.map((day, index) => (
                                    <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm">
                                        <div className="flex items-center justify-between mb-4 pb-2 border-b">
                                            <h4 className="text-lg font-bold text-gray-800">Day {index + 1}</h4>
                                            {formData.days.length > 1 && (
                                                <button
                                                    onClick={() => removeDay(index)}
                                                    className="text-red-500 hover:text-red-700 transition"
                                                    aria-label={`Remove Day ${index + 1}`}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                            <InputField label="Date" value={day.date} onChange={(e) => updateDay(index, 'date', e.target.value)} placeholder="e.g., 27th November" />
                                            <InputField label="Day Title" value={day.title} onChange={(e) => updateDay(index, 'title', e.target.value)} placeholder="e.g., Arrival In Singapore & City Exploration" className="md:col-span-2" />
                                            <InputField label="Image URL (Placeholder)" value={day.imageUrl} onChange={(e) => updateDay(index, 'imageUrl', e.target.value)} placeholder="URL for day image" />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <TextareaField label={<><Sun size={14} className="inline mr-1 align-sub text-yellow-500" /> Morning Activities</>} value={day.activities.morning} onChange={(e) => updateActivity(index, 'morning', e.target.value)} rows={3} />
                                            <TextareaField label={<><Cloud size={14} className="inline mr-1 align-sub text-blue-400" /> Afternoon Activities</>} value={day.activities.afternoon} onChange={(e) => updateActivity(index, 'afternoon', e.target.value)} rows={3} />
                                            <TextareaField label={<><Moon size={14} className="inline mr-1 align-sub text-indigo-500" /> Evening Activities</>} value={day.activities.evening} onChange={(e) => updateActivity(index, 'evening', e.target.value)} rows={3} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </DynamicSection>
                        
                        {/* Flights Section */}
                        <DynamicSection icon={Plane} title="Flight Details" onAdd={addFlight}>
                            <div className="space-y-4">
                                {formData.flights.map((flight, index) => (
                                    <div key={index} className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition duration-150">
                                        <div className="flex-1 w-full">
                                            <InputField label="Date" value={flight.date} onChange={(e) => updateFlight(index, 'date', e.target.value)} placeholder="e.g., Thu 10 Jan'24" className="w-full" />
                                        </div>
                                        <div className="flex-[3] w-full">
                                            <InputField label="Flight Details" value={flight.flight} onChange={(e) => updateFlight(index, 'flight', e.target.value)} placeholder="e.g., Fly Air India (AX-123) From Delhi (DEL) To Singapore (SIN)" className="w-full" />
                                        </div>
                                        {formData.flights.length > 1 && (
                                            <button
                                                onClick={() => removeFlight(index)}
                                                className="mt-6 md:mt-2 text-red-500 hover:text-red-700 transition self-center"
                                                aria-label={`Remove flight ${index + 1}`}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm text-gray-500 mt-4 px-2">
                                *Note: All Flights Include Meals, Seat Choice (Excluding XL), And 20kg/25Kg Checked Baggage.
                            </div>
                        </DynamicSection>

                        {/* Hotels Section */}
                        <DynamicSection icon={Hotel} title="Hotel Bookings" onAdd={addHotel}>
                            <div className="space-y-4">
                                {formData.hotels.map((hotel, index) => (
                                    <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm hover:bg-gray-100 transition duration-150">
                                        <div className="flex items-center justify-between mb-4 pb-2 border-b">
                                            <h4 className="text-lg font-bold text-gray-800">Hotel {index + 1}</h4>
                                            {formData.hotels.length > 1 && (
                                                <button
                                                    onClick={() => removeHotel(index)}
                                                    className="text-red-500 hover:text-red-700 transition"
                                                    aria-label={`Remove hotel ${index + 1}`}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                                            <InputField label="City" value={hotel.city} onChange={(e) => updateHotel(index, 'city', e.target.value)} />
                                            <InputField label="Hotel Name" value={hotel.hotelName} onChange={(e) => updateHotel(index, 'hotelName', e.target.value)} className="lg:col-span-2" />
                                            <InputField label="Check In" value={hotel.checkin} onChange={(e) => updateHotel(index, 'checkin', e.target.value)} placeholder="DD/MM/YYYY" />
                                            <InputField label="Check Out" value={hotel.checkOut} onChange={(e) => updateHotel(index, 'checkOut', e.target.value)} placeholder="DD/MM/YYYY" />
                                            <InputField label="Nights" value={hotel.nights} onChange={(e) => updateHotel(index, 'nights', e.target.value)} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm text-gray-500 mt-4 px-2 space-y-1">
                                <p>1. All Hotels Are Tentative And Can Be Replaced With Similar. 2. Breakfast Included For All Hotel Stays. 3. All Hotels Will Be 4 And Above Category. 4. A maximum occupancy of 2 people/room is allowed in most hotels.</p>
                            </div>
                        </DynamicSection>
                        
                        {/* Activities & Sightseeing Section */}
                        <DynamicSection icon={List} title="Activities & Sightseeing" onAdd={addActivityItem}>
                            <div className="space-y-4">
                                {formData.activities.map((activity, index) => (
                                    <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm hover:bg-gray-100 transition duration-150">
                                        <div className="flex items-center justify-between mb-4 pb-2 border-b">
                                            <h4 className="text-lg font-bold text-gray-800">Activity {index + 1}</h4>
                                            {formData.activities.length > 1 && (
                                                <button
                                                    onClick={() => removeActivityItem(index)}
                                                    className="text-red-500 hover:text-red-700 transition"
                                                    aria-label={`Remove activity ${index + 1}`}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                            <InputField label="City" value={activity.city} onChange={(e) => updateActivityItem(index, 'city', e.target.value)} />
                                            <InputField label="Activity Name" value={activity.activity} onChange={(e) => updateActivityItem(index, 'activity', e.target.value)} className="lg:col-span-2" />
                                            <InputField label="Type" value={activity.type} onChange={(e) => updateActivityItem(index, 'type', e.target.value)} placeholder="e.g., Nature/Sightseeing" />
                                            <InputField label="Time Required" value={activity.timeRequired} onChange={(e) => updateActivityItem(index, 'timeRequired', e.target.value)} placeholder="e.g., 2-3 Hours" />
                                            <InputField label="Status" value={activity.status} onChange={(e) => updateActivityItem(index, 'status', e.target.value)} placeholder="e.g., Awaiting Confirmation" className="lg:col-span-full" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </DynamicSection>

                        {/* Payment Plan Section */}
                        <DynamicSection icon={DollarSign} title="Payment Plan">
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pb-4 border-b">
                                    <InputField 
                                        label="Total Amount" 
                                        value={formData.paymentPlan.totalAmount} 
                                        onChange={(e) => setFormData({ ...formData, paymentPlan: { ...formData.paymentPlan, totalAmount: e.target.value } })}
                                        placeholder="e.g., ₹9,00,000 For 3 Pax (Inclusive Of GST)"
                                    />
                                    <InputField 
                                        label="TCS" 
                                        value={formData.paymentPlan.tcs} 
                                        onChange={(e) => setFormData({ ...formData, paymentPlan: { ...formData.paymentPlan, tcs: e.target.value } })}
                                        placeholder="e.g., Not Collected"
                                    />
                                </div>

                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-lg font-bold text-gray-800">Installments</h4>
                                    <button
                                        onClick={addInstallment}
                                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition duration-150 shadow-md"
                                    >
                                        <Plus size={16} />
                                        Add Installment
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {formData.paymentPlan.installments.map((inst, index) => (
                                        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white rounded-lg p-4 shadow-inner border border-gray-100 hover:bg-gray-100 transition duration-150">
                                            <InputField label="Installment Name" value={inst.name} onChange={(e) => updateInstallment(index, 'name', e.target.value)} />
                                            <InputField label="Amount" value={inst.amount} onChange={(e) => updateInstallment(index, 'amount', e.target.value)} placeholder="e.g., ₹4,00,000" />
                                            <div className="flex items-end gap-2">
                                                <div className="flex-1">
                                                    <InputField label="Due Date" value={inst.dueDate} onChange={(e) => updateInstallment(index, 'dueDate', e.target.value)} placeholder="e.g., Post Visa Approval" />
                                                </div>
                                                {formData.paymentPlan.installments.length > 1 && (
                                                    <button
                                                        onClick={() => removeInstallment(index)}
                                                        className="self-center text-red-500 hover:text-red-700 transition p-2 mb-0.5"
                                                        aria-label={`Remove installment ${index + 1}`}
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </DynamicSection>
                        
                        {/* Visa Details Section */}
                        <DynamicSection icon={FileText} title="Visa Details" headerClass="border-b-0">
                            <div className="space-y-4">
                                {formData.visaDetails.map((visa, index) => (
                                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <InputField label="Visa Type" value={visa.visaType} onChange={(e) => setFormData(prev => ({ ...prev, visaDetails: [{ ...prev.visaDetails[0], visaType: e.target.value }] }))} />
                                        <InputField label="Validity" value={visa.validity} onChange={(e) => setFormData(prev => ({ ...prev, visaDetails: [{ ...prev.visaDetails[0], validity: e.target.value }] }))} />
                                        <InputField label="Processing Date" value={visa.processingDate} onChange={(e) => setFormData(prev => ({ ...prev, visaDetails: [{ ...prev.visaDetails[0], processingDate: e.target.value }] }))} />
                                    </div>
                                ))}
                            </div>
                        </DynamicSection>

                        {/* Terms and Conditions (Simple Text Link from screenshot) */}
                        <div className="text-sm mb-8 px-2">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Terms and Conditions</h3>
                            <a href="#" className="text-blue-600 hover:text-blue-800 transition">
                                View all terms and conditions
                            </a>
                        </div>
                        
                        {/* Important Notes Section */}
                        <DynamicSection icon={Clock} title="Important Notes" onAdd={addNote}>
                            <div className="space-y-4">
                                {formData.importantNotes.map((note, index) => (
                                    <div key={index} className="flex gap-4 bg-white rounded-lg p-4 shadow-inner border border-gray-100 hover:bg-gray-100 transition duration-150">
                                        <div className="flex-1">
                                            <InputField label="Point" value={note.point} onChange={(e) => updateNote(index, 'point', e.target.value)} />
                                        </div>
                                        <div className="flex-[2] relative">
                                            <TextareaField label="Details" value={note.details} onChange={(e) => updateNote(index, 'details', e.target.value)} rows={2} />
                                            {formData.importantNotes.length > 1 && (
                                                <button
                                                    onClick={() => removeNote(index)}
                                                    className="absolute bottom-2 right-2 text-red-500 hover:text-red-700 transition p-1"
                                                    aria-label={`Remove note ${index + 1}`}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </DynamicSection>

                         {/* Scope of Service Section */}
                        <DynamicSection icon={CheckCircle} title="Scope of Service" onAdd={addScope}>
                            <div className="space-y-4">
                                {formData.scopeOfService.map((scope, index) => (
                                    <div key={index} className="flex gap-4 bg-white rounded-lg p-4 shadow-inner border border-gray-100 hover:bg-gray-100 transition duration-150">
                                        <div className="flex-1">
                                            <InputField label="Service" value={scope.service} onChange={(e) => updateScope(index, 'service', e.target.value)} />
                                        </div>
                                        <div className="flex-[2] relative">
                                            <TextareaField label="Details" value={scope.details} onChange={(e) => updateScope(index, 'details', e.target.value)} rows={2} />
                                            {formData.scopeOfService.length > 1 && (
                                                <button
                                                    onClick={() => removeScope(index)}
                                                    className="absolute bottom-2 right-2 text-red-500 hover:text-red-700 transition p-1"
                                                    aria-label={`Remove service ${index + 1}`}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm text-gray-500 mt-4 px-2">
                                *Transfer Policy(Refundable Upon Claim): If Any Transfer Is Delayed Beyond 15 Minutes, Customers May Book An App-Based Or Radio Taxi And Claim A Refund For That Specific Leg.
                            </div>
                        </DynamicSection>

                        {/* Inclusion Summary (Read-Only table view based on screenshot data) */}
                        <DynamicSection icon={List} title="Inclusion Summary">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead>
                                        <tr>
                                            <th className="px-3 py-2 text-left text-xs font-semibold text-white uppercase tracking-wider bg-indigo-700 w-1/5">Category</th>
                                            <th className="px-3 py-2 text-left text-xs font-semibold text-white uppercase tracking-wider bg-indigo-700 w-1/12">Count</th>
                                            <th className="px-3 py-2 text-left text-xs font-semibold text-white uppercase tracking-wider bg-indigo-700 w-2/5">Details</th>
                                            <th className="px-3 py-2 text-left text-xs font-semibold text-white uppercase tracking-wider bg-indigo-700 w-1/4">Status / Comments</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {formData.inclusionSummary.map((item, index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                                <td className="p-3 whitespace-normal text-sm font-medium text-gray-900">{item.category}</td>
                                                <td className="p-3 whitespace-nowrap text-sm text-gray-500">{item.count}</td>
                                                <td className="p-3 whitespace-normal text-sm text-gray-500">{item.details}</td>
                                                <td className="p-3 whitespace-normal text-sm text-gray-500">{item.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </DynamicSection>


                        {/* Generate PDF Button */}
                        <div className="flex justify-center pt-4 pb-8">
                            <button
                                onClick={generatePDF}
                                className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition duration-300 shadow-xl text-lg font-bold transform hover:scale-[1.01]"
                            >
                                <Download size={24} />
                                Get Itinerary (Generate PDF)
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ItineraryBuilder;

