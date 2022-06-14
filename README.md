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

> Note: `country` field of employee object is being kept as it is, while country details is appended
> in `countryData` field. `countryData` is an object itself containing country specific fields.
> Thoughts behight this response data structure are...
> - `country` field is not replaced by `countryData` considering we don't want to refactor other areas where `country` field is being used already.
> - Country specific data are inside `countryData` object, instead of top level (employee) because these fields not necessarily employee's property. For example, a country might have 1 official language but employee may be bi-langual.


```
[
  
    "firstName": "Roy",
    "lastName": "Testerton",
    "dateOfBirth": "19/02/1990",
    "jobTitle": "Software developer",
    "company": "Test co",
    "country": "US",
    "countryData": {
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