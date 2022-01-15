import supertest from "supertest";
import app from "../src/app";
import { connectDb, closeDb, clearDb } from "../memoryServer/db";
// import { response } from "express";

let request: supertest.SuperTest<supertest.Test>;
let token = "";
let id = "";

beforeAll(async () => {
  await connectDb();
  request = supertest(app);
});

afterEach(async () => {
  // await clearDb();
});

afterAll(async () => {
  await closeDb();
});

describe("User Authentication", () => {
  const data = {
    firstName: "Morgan",
    lastName: "Freeman",
    DOB: "25/07/1976",
    email: "morgan@gmail.com",
    phoneNumber: "08075743421",
    password: "12345678",
  };

  test("user with valid data should signup", async () => {
    const response = await request.post("/user/signup").send(data);
    // console.log(response.body)
    expect(response.status).toBe(201);
    expect(response.body.status).toBe("success");
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data.email).toBe(data.email);
  });
});

describe("User Authorization", () => {
  const logData = {
    email: "morgan@gmail.com",
    password: "12345678",
  };

  test("user with valid email and password should login", async () => {
    const response = await request.post("/user/login").send(logData);

    token = response.body.token;

    // console.log(response.body)
    expect(response.status).toBe(201);
    expect(response.body.status).toBe("success");
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data.email).toBe(logData.email);
  });
});

describe("Endpoints for creating authors", () => {
  const authorData = {
    author_name: "Rook Newson",
    age: 31,
    address: "37, Brew way, Buckingham",
  };
  //         ID = response.body.author.ID;
  test("Create a new Author", async () => {
    const response = await request
      .post("/author/create_authors")
      .send(authorData)
      .set(`Authorization`, `Bearer ${token}`);
    id = response.body.data._id;

    expect(response.status).toBe(201);
    expect(response.body.status).toBe("success");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data.author_name).toBe(authorData.author_name);
    expect(response.body.data.age).toBe(authorData.age);
    expect(response.body.data.address).toBe(authorData.address);
  });
});

describe("Endpoints for getting all available authors", () => {
  test("Get all Authors", async () => {
    const response = await request
      .get("/author")
      .set(`Authorization`, `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body).toHaveProperty("data");
    expect(response.body).toHaveProperty("result");
  });
});

describe("Endpoints for getting a author", () => {
  test("Get a new Author by id", async () => {
    const response = await request
      .get(`/author/${id}`)
      .set(`Authorization`, `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    // expect(response.body.author).toHaveProperty('data')
  });
});

describe("Endpoints for updating authors", () => {
  const data = {
    author_name: "Rook Newson",
    age: 31,
    address: "37, Brew way, Buckingham",
  };
  test("Update a new Author", async () => {
    console.log(id, "author from update");
    const response = await request
      .put(`/author/${id}`)
      .send(data)
      .set(`Authorization`, `Bearer ${token}`);

    // console.log(response, "after update...")

    expect(response.status).toBe(201);
    expect(response.body.status).toBe("success");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data.author_name).toBe(data.author_name);
    expect(response.body.data.age).toBe(data.age);
    expect(response.body.data.address).toBe(data.address);
  });
});


describe("Endpoints for deleting authors", () => {
    const data = {
        author_name: "Rook Newson",
        age: 31,
        address: "37, Brew way, Buckingham",
    };
    test("Update a new Author", async () => {
        console.log(id, "author from update");
        const response = await request
            .delete(`/author/${id}`)
            .send(data)
            .set(`Authorization`, `Bearer ${token}`);

        // console.log(response, "after update...")

        expect(response.status).toBe(201);
        expect(response.body.status).toBe("success");
        expect(response.body).toHaveProperty("data");
        expect(response.body.data.author_name).toBe(data.author_name);
        expect(response.body.data.age).toBe(data.age);
        expect(response.body.data.address).toBe(data.address);
    });
});



describe("Endpoints for creating books", () => {
  test("Create a new book", async () => {
    console.log(id, "author id");
    const bookData = {
      authorId: String(id),
      bookname: "How to Be a Senior Dev",
      isPublished: true,
      datePublished: 1637159508581,
      serialNumber: 19,
    };
    const response = await request
      .post("/book")
      .send(bookData)
      .set(`Authorization`, `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("book saved...");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("newBook");
    expect(response.body.data.newBook.bookname).toBe(bookData.bookname);
    expect(response.body.data.newBook.authorId).toBe(bookData.authorId);
    expect(response.body.data.newBook.serialNumber).toBe(bookData.serialNumber);
  });
});

//let res:string;
// describe("authors", () => {
//     const data = {
//         author: "Hannah Montanna",
//         age: 32,
//         address: "7, Straight Street, Walls",
//     };
//     test("create author", async () => {
//         const response = await supertest(app)
//             .post("/author")
//             .set("Authorization", `Bearer ${token}`)
//             .send(data);
//         //console.log(response.body, "****");
//         authorId = response.body.author._id;
//         ID = response.body.author.ID;
//         expect(response.status).toBe(201);
//         expect(response.body.message).toBe("successful!");
//         expect(response.body.author.author).toBe(data.author);
//     });
//     test("get all authors", async () => {
//         const response = await supertest(app)
//             .get("/author")
//             .set("Authorization", `Bearer ${token}`);
//         //console.log(response.body);
//         expect(response.status).toBe(200);
//         expect(response.body.author[0]).toHaveProperty("ID");
//     });
//     test("get an author", async () => {
//         const response = await supertest(app)
//             .get(`/author/${authorId}`)
//             .set("Authorization", `Bearer ${token}`);
//         //console.log(response.body);
//         expect(response.status).toBe(200);
//         expect(response.body.author).toHaveProperty("address");
//     });
//     test("update an author", async () => {
//         const response = await supertest(app)
//             .put(`/author/${authorId}`)
//             .set("Authorization", `Bearer ${token}`)
//             .send({
//                 author: "Charis Claire",
//                 age: 32,
//                 address: "7, Straight Street, Walls",
//             });
//         //console.log(response.body.author.author)
//         expect(response.status).toBe(200);
//         expect(response.body.message).toBe("successful!");
//         expect(response.body.author.author).toMatch("Charis Claire");
//     });
//     test("delete an author", async () => {
//         const response = await supertest(app)
//             .delete(`/author/${authorId}`)
//             .set("Authorization", `Bearer ${token}`);
//         //   console.log(response.body)
//         expect(response.status).toBe(200);
//         expect(response.body.message).toBe("successful!");
//     });
// });
// describe("books", () => {
//     const data = {
//         name: "Sunrise",
//         isPublished: true,
//         datePublished: "2022-01-09",
//         serialNumber: "0002",
//     };
//     test("create a book", async () => {
//         const response = await supertest(app)
//             .post(`/book/${ID}`)
//             .set("Authorization", `Bearer ${token}`)
//             .send(data);
//         bookId = response.body.book._id;
//         expect(response.status).toBe(200);
//     });
//     test("get an author's book", async () => {
//         const response = await supertest(app)
//             .get(`/book/author/${authorId}`)
//             .set("Authorization", `Bearer ${token}`);
//         //console.log(response.body)
//         expect(response.status).toBe(200);
//     });
//     test("get a book", async () => {
//         const response = await supertest(app)
//             .get(`/book/${bookId}`)
//             .set("Authorization", `Bearer ${token}`);
//         //console.log(response.body.book.name);
//         expect(response.status).toBe(200);
//     });
//     test("update a book", async () => {
//         const response = await supertest(app)
//             .put(`/book/${bookId}`)
//             .set("Authorization", `Bearer ${token}`)
//             .send({
//                 name: "Sunset",
//                 isPublished: true,
//                 datePublished: "2022-01-09",
//                 serialNumber: "0002",
//             });
//         //console.log(response.body);
//         expect(response.status).toBe(200);
//         expect(response.body.message).toBe("successful!");
//         expect(response.body.book.name).toMatch("Sunset");
//     });
//     test("delete a book", async () => {
//         const response = await supertest(app)
//             .delete(`/book/${bookId}`)
//             .set("Authorization", `Bearer ${token}`);
//         //   console.log(response.body)
//         expect(response.status).toBe(200);
//         expect(response.body.message).toBe("successful!");
//     });
// });
