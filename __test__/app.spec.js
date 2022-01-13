"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
describe("Auth", () => {
    const data = {
        firstName: "Morgan",
        lastName: "Freeman",
        DOB: "12-01-1901",
        email: "morgan@gmail.com",
        phoneNo: "090899566759",
        password: "password",
    };
    test("signup", async () => {
        const response = await (0, supertest_1.default)(app_1.default).post("/user/signup").send(data);
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("signup successful...");
        expect(response.body.data.user.email).toBe(data.email);
    });
    test("login", async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post("/user/login")
            .send({ email: data.email, password: data.password });
        token = response.body.data.token;
        // console.log(response.body);
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("login successful");
    });
});
//let res:string;
describe("authors", () => {
    const data = {
        author: "Hannah Montanna",
        age: 32,
        address: "7, Straight Street, Walls",
    };
    test("create author", async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post("/author")
            .set("Authorization", `Bearer ${token}`)
            .send(data);
        //console.log(response.body, "****");
        authorId = response.body.author._id;
        ID = response.body.author.ID;
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("successful!");
        expect(response.body.author.author).toBe(data.author);
    });
    test("get all authors", async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .get("/author")
            .set("Authorization", `Bearer ${token}`);
        //console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.author[0]).toHaveProperty("ID");
    });
    test("get an author", async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .get(`/author/${authorId}`)
            .set("Authorization", `Bearer ${token}`);
        //console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.author).toHaveProperty("address");
    });
    test("update an author", async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .put(`/author/${authorId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
            author: "Charis Claire",
            age: 32,
            address: "7, Straight Street, Walls",
        });
        //console.log(response.body.author.author)
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("successful!");
        expect(response.body.author.author).toMatch("Charis Claire");
    });
    test("delete an author", async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .delete(`/author/${authorId}`)
            .set("Authorization", `Bearer ${token}`);
        //   console.log(response.body)
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("successful!");
    });
});
describe("books", () => {
    const data = {
        name: "Sunrise",
        isPublished: true,
        datePublished: "2022-01-09",
        serialNumber: "0002",
    };
    test("create a book", async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post(`/book/${ID}`)
            .set("Authorization", `Bearer ${token}`)
            .send(data);
        bookId = response.body.book._id;
        expect(response.status).toBe(200);
    });
    test("get an author's book", async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .get(`/book/author/${authorId}`)
            .set("Authorization", `Bearer ${token}`);
        //console.log(response.body)
        expect(response.status).toBe(200);
    });
    test("get a book", async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .get(`/book/${bookId}`)
            .set("Authorization", `Bearer ${token}`);
        //console.log(response.body.book.name);
        expect(response.status).toBe(200);
    });
    test("update a book", async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .put(`/book/${bookId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
            name: "Sunset",
            isPublished: true,
            datePublished: "2022-01-09",
            serialNumber: "0002",
        });
        //console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("successful!");
        expect(response.body.book.name).toMatch("Sunset");
    });
    test("delete a book", async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .delete(`/book/${bookId}`)
            .set("Authorization", `Bearer ${token}`);
        //   console.log(response.body)
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("successful!");
    });
});
