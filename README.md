# Fake-Store Web Application

This is a simple React-based web application named Fake-Store. The application provides functionality for user authentication, product management, and a responsive navigation bar. Users can register, log in, add products to a fake store, and view a dashboard with different pages.

## Getting Started

Clone the repository to your local machine:

```bash
git clone https://github.com/madhavgupta07/fake-store-app.git
```

Navigate to the project directory:

```bash
cd fake-store-app
```

Install dependencies:

```bash
npm install
```

## Features

- User authentication (register, login, logout, reset password)
- Add products to the fake store with title, price, description, image URL, and category
- Responsive navigation bar with navigation buttons and user settings
- Dashboard displaying different pages
- Integration with Firebase for authentication and database storage
- Axios for making API calls to a fake store API
- Routing using React Router
- Material-UI for styling components

## Dependencies

- React
- React Router Dom
- Material-UI
- Axios
- Firebase

## Usage

- Register a new account or log in with existing credentials.
- Navigate through the dashboard using the responsive navigation bar.
- Add products to the fake store by providing relevant details.
- Delete products.
- You can’t add view the added product on the dashboard because we can’t change the data in the real API endpoint.
- Log out to end the session.

## API Calls

The application uses Axios to make API calls to a fake store API. The API endpoints are defined in the `axiosMethodCalls.js` file in the `Datalayer` folder.
All API Endpoints are defined in `config_url.js` file in the `Configuration` folder

## How to Run

To run the application locally, use the following command:

```bash
npm run dev
```

The application will be accessible at [http://localhost:3000](http://localhost:3000) in your web browser.


