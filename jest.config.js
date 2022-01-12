// module.exports = {
//     preset: "ts-jest",
//     testEnvironment: "node",
//     testPathIgnorePatterns: ["dist"],
//     testMatch:["**/**/*.test.ts"],
    
//     verbose: true,
    
//     forceExit: true,
    
// }

module.exports = {

    roots: ["<rootDir>"],
    
    transform: {
    
    "^.+\\.tsx?$": "ts-jest",
    
    },
    
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    testEnvironment: "node"
    };

// module.exports = {

//     preset: 'ts-jest',
    
//     testEnvironment: 'node',
    
//     testMatch:["**/**/*.test.ts"],
    
//     verbose: true,
    
//     forceExit: true,
    
//     // clearMocks: true,
    
//     };