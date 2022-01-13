import supertest from "supertest";
import app from "../src/app";
import { connectDb, closeDb, clearDb } from '../memoryServer/db';

let request: supertest.SuperTest<supertest.Test>;
beforeAll(async () => {
    await connectDb();
    request = supertest(app)
})

afterEach(async () => {
    await clearDb();
});

afterAll(async () => {
    await closeDb();
})

describe("Auth", () => {
    const data = {
        firstName: "Morgan",
        lastName: "Freeman",
        DOB: "12-01-1901",
        email: "morgan@gmail.com",
        phoneNumber: "090899566759",
        password: "password",
    };
    test("user with valid data should signup", async () => {
        const response = await request.post("/user/signup").send(data);
        expect(response.status).toBe(201);
        expect(response.body.status).toBe('success');
        expect(response.body.data.firstName).toBe(data.firstName);
        expect(response.body.data.email).toBe(data.email)
    });

    test("user with valid data should signup", async () => {
        const response = await request.post("/user/signup").send({
            ...data,
            email: "anita@email.com"
        });
        expect(response.status).toBe(201);
        expect(response.body.status).toBe('success');

        expect(response.body.data.email).toBe('anita@email.com')

    });

    test('user with invalid email should not signup', async () => {
        const invalidData = {
            firstName: "Morgan",
            lastName: "Freeman",
            DOB: "12-01-1901",
            email: "invalid email",
            phoneNumber: "090899566759",
            password: "password",
        }

        const response = await request.post('/user/signup').send(invalidData);

        expect(response.status).toBe(400);
        expect(response.body.msg).toBe('Validation failed...')
    });


    // test("login", async () => {
    //     const response = await supertest(app)
    //         .post("/user/login")
    //         .send({ email: data.email, password: data.password });
    //     token = response.body.data.token;
    //     // console.log(response.body);
    //     expect(response.status).toBe(201);
    //     expect(response.body.message).toBe("login successful");
    // });
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























