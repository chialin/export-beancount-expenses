# Beancount Expense Tracker

Beancount Expense Tracker is a web application that helps you log daily expenses and automatically generates transactions in the [Beancount](https://beancount.github.io/) format. This tool allows you to record expenses in real time and export them for easy integration with your Beancount financial records.

## Beancount Example

Once you log an expense, the application will generate a Beancount transaction like the following:

```

2024-10-03 \* "Expense"
Assets:Cash -100.00 TWD
Expenses:Food 100.00 TWD

```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or later)
- npm or yarn

### Installation

3. Install the dependencies:

```bash
  npm install
```

or

```bash
  yarn install
```

### Running the Application

To start the development server, run:

```bash
  npm run dev
```

or

```bash
  yarn dev
```

This will run the application in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### Building for Production

To build the app for production, run:

```bash
  npm run build
```

or

```bash
  yarn build
```

This will create an optimized production build in the `dist` folder.
