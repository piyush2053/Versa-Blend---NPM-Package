<p align="center">
  <a href="https://www.linkedin.com/in/beingpiyushpatel/"><img src="https://i.ibb.co/dBSY4Md/logo1.png" alt="Versa-Blend"></a>
</p>

# Versa Blend

Versa Blend is a Node.js package available on the npm registry, designed to simplify the development process for programmers. With Versa Blend, developers gain access to a wide array of tools, functions, and methods, allowing them to streamline their coding efforts and reduce the need for custom logic. This package is particularly useful for those working with Express.js, general JavaScript operations, and XML document manipulations.


# Installation

```bash
npm install -g versa-blend # or using yarn: yarn global add versa-blend
```

And Versa blend will be installed globally to your system path.

You can also install Versa blend  as a development dependency:

```bash
npm install --save-dev versa-blend  # or using yarn: yarn add versa-blend -D
```

# How to Use

`Add to Free Database (OBJECT BASED)`

This function provides a user-friendly and cost-effective solution for storing and retrieving data objects in a JSON file, making it an excellent choice for beginners working on various projects.

### Usage

```javascript
const object_user = {
  id_unique :"898",
  name : "John Doe",
  email : "john@doe.com" ,
  phone : "999999999"
}
addToDatabase(object_user)

//Thats it your data is stored
```

`Fetch from same Database (OBJECT BASED)`

```javascript
const id_unique = 898
const my_data = fetchDataFromDatabase(id_unique)
console.log(my_data)

//Output - {
  // id_unique :"898",
  // name : "John Doe",
  // email : "john@doe.com" ,
  // phone : "999999999"
}

//Thats it your data is stored
```


`xmlString`

This function parses an XML string and returns a Promise that resolves to the parsed JavaScript object.

### Usage

```javascript
xml2js('<root><item>Hello</item></root>')
  .then(result => {
    console.log(result); // Parsed XML object
  })
  .catch(error => {
    console.error(error);
  });
```



Here's a brief example for `excel to pdf`:

```markdown
`excel2pdf(excelFilePath, pdfFilePath)`
```

This function converts an Excel file to a PDF.

### Usage

```javascript
excel2pdf('input.xlsx', 'output.pdf')
  .then(() => {
    console.log('Conversion completed successfully.');
  })
  .catch(error => {
    console.error(error);
  });
  ```

