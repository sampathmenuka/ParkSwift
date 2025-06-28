## Project Overview

**ParkSwift** is an online parking reservation system designed to simplify parking by connecting drivers with available parking spaces and enabling space owners to monetize their unused spots. The platform offers a seamless experience with features like instant booking, secure payments, and contactless entry.
![Screenshot (158)](https://github.com/user-attachments/assets/95f9d15c-90e6-4295-8703-c5d5445dc9e4)


### Search Parking Spaces
This section allows users to find and reserve parking spaces based on their preferences.

#### Features
- **Filters**:
  - **Location**: Search by entering an address, city, or landmark.
  - **Date**: Select a specific date (e.g., mm/dd/yyyy).
  - **Start Time & End Time**: Set the desired parking duration.
  - **Price Range**: Filter by minimum and maximum price (in LKR).
  - **Slot Type**: Option to show only available slots.
  - **Actions**: "Search" to apply filters and "Reset" to clear them.
- **Search Results**:
  - Displays available parking spaces with details:
    - **Location**: E.g., "8 Fort Road, Galle Fort" or "99 Beach Road, Negombo."
    - **Price**: E.g., LKR 120 or LKR 140 per hour.
    - **Availability**: Indicates if the slot is "Available" or "Not Available" (e.g., for Jun 03, 2025, or Jun 15, 2025).
    - **Coverage**: Uncovered or covered parking options.
    - **Security**: Security status (e.g., 24/7).
    - **Slots**: Number of available slots (e.g., 2 or 4).
    - **Reviews**: User ratings (e.g., 0 or 4 reviews).
  - **Action**: "Reserve Now" button to book a selected slot.
- **Found**: Indicates the number of parking spaces found near the user (e.g., 5 parking spaces).


![Screenshot (159)](https://github.com/user-attachments/assets/bde7055a-e36d-415f-a29d-d904e175cd4d)


#### Mission
- ParkSwift was founded to eliminate the frustration of finding parking in busy urban areas.
- The platform connects drivers with available parking spaces through a seamless digital platform.
- Goals include reducing traffic congestion, saving time for drivers, and helping parking space owners monetize their unused spaces.

  
![Screenshot (160)](https://github.com/user-attachments/assets/723019f4-19f4-41e4-957c-4d6b515d0c64)

#### How It Works
- Connects two types of users:
  - **Drivers**: Can search, book, and pay for parking spaces in advance or on the spot.
  - **Parking Space Owners**: Can list their available spaces and earn income from them.
- The system handles reservations, payments, and provides navigation to the parking spot.

## Admin Panel Features

![Screenshot (164)](https://github.com/user-attachments/assets/ebf87441-1dad-40ac-ab04-2374e62253da)

#### Notifications
- **Send New Notification**:
  - **Fields**: Notification title, message, and target group (e.g., All Users, Slot Owners).
  - **Delivery Methods**: In-App and Email.
  - **Actions**: "Cancel" or "Send Notification" buttons.
- **Notification Statistics**:
  - **Total Sent**: 3 notifications.
  - **To Users**: 1 notification.
  - **To Owners**: 1 notification.
- **Recently Sent Notifications**:
  - **Title**: E.g., "System Maintenance," "New Feature: Multiple Vehicle Types."
  - **Message**: Brief description (e.g., "The system will be down for maintenance," "Slot owners can now specify multiple vehicle types").
  - **Target Group**: E.g., All Users, Slot Owners.
  - **Sent At**: E.g., 11/10/2023, 8:30:00 AM; 11/15/2023, 6:00:00 PM.
  - **Sent By**: E.g., Michael Brown.
 
    
 ![Screenshot (165)](https://github.com/user-attachments/assets/374d89de-3e0c-4eff-b8fd-0133432dca8c)

#### Manage Parking Slots
- **Details**:
  - **Name**: E.g., Downtown Garage Spot, Waterfront Parking, Mall Covered Spot, Stadium Parking.
  - **Address**: E.g., 123 Main St, Downtown; 456 Harbor Dr, Seaside.
  - **Type**: Covered or uncovered.
  - **Hourly Rate**: E.g., $5.00, $4.00, $6.25, $7.00.
  - **Status**: Active, pending, inactive.
  - **Actions**: Deactivate, Approve, Reject, or Activate buttons.
- **Additional Features**:
  - Search functionality to filter slots.
  - "Export Slot Data" button for data export.

![Screenshot (167)](https://github.com/user-attachments/assets/034ca59a-6b10-44cb-b5b6-84ec99239f01)

#### System Logs
- **Details**:
  - **Timestamp**: E.g., 11/15/2023, 10:23:45 AM; 11/15/2023, 5:40:01 PM.
  - **Action**: E.g., USER_LOGIN, SLOT_CREATED, BOOKING_COMPLETED, ADMIN_ACTION, USER_LOGOUT.
  - **Description**: E.g., "User logged in successfully," "New parking slot added," "Booking payment processed successfully," "User account banned," "User logged out."
  - **User**: E.g., John Doe, Jane Smith, Michael Brown.
  - **IP Address**: E.g., 192.168.1.1, 192.168.1.2.
- **Additional Features**:
  - Search functionality to filter logs.
  - "Export Logs" button for data export.
 
 ![Screenshot (166)](https://github.com/user-attachments/assets/b2d5a3db-2cf6-4d02-b1af-b4cb3d3e342b)

  #### Bookings
- **View All Bookings**:
  - **Booking ID**: E.g., #1, #2, #3, #4.
  - **Customer**: E.g., Alex Johnson, Maria Garcia, David Wilson, Sarah Miller.
  - **Parking Slot**: E.g., Downtown Garage Spot, Waterfront Parking, Mall Covered Spot.
  - **Date**: E.g., 2023-11-15, 2023-11-16.
  - **Time**: E.g., 10:00 - 12:00, 14:00 - 16:00.
  - **Amount**: E.g., $1.00, $8.00, $22.00, $7.50.
  - **Payment**: E.g., paid, pending, failed.
  - **Status**: E.g., confirmed, completed, cancelled.
- **Additional Features**:
  - Search functionality with date filter (mm/dd/yyyy).
  - "Export Booking Data" button for data export.
 

 ### License
© 2025 ParkSwift. All rights reserved.
  


