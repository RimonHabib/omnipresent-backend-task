# OmniPresent Backend Task

Task: To create an endpoint which will respond with employee list, with fetching employee country details

## Clone the repository
```
git clone git@github.com:RimonHabib/omnipresent-backend-task.git
```

## Install Dependency
```
npm install
```

## Run Tests
```
npm run test
```

## Run the program
```
npm start
```


## Response data format for employee endpoint

> Note: country field inside employee object is replaced by country data, which was previously country code.
> The thinking behind that is, type of data we are representing is country's property, not neccesserily   employee's property. For example, country might have 1 official language but employee might be bi-langual.
> Same for timezone.


```
[
  {
    "firstName": "Roy",
    "lastName": "Testerton",
    "dateOfBirth": "19/02/1990",
    "jobTitle": "Software developer",
    "company": "Test co",
    "country": {
      "name": "United States of America",
      "currency": "USD",
      "languages": [
        "English"
      ],
      "timezones": [
        "UTC-12:00",
        "UTC-11:00",
        "UTC-10:00",
        "UTC-09:00",
        "UTC-08:00",
        "UTC-07:00",
        "UTC-06:00",
        "UTC-05:00",
        "UTC-04:00",
        "UTC+10:00",
        "UTC+12:00"
      ]
    }
  },
  ...
  ...
]
  ```