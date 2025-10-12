# Food&hunger — Backend (Spring Boot)

## folder Structure

**Food&hunger** is a web platform connecting restaurants, supermarkets, and households donating surplus food with local NGOs and shelters.  
It ensures safe, verified, and real-time food redistribution to reduce waste and hunger.

## Project Structure

```bash
foodandhunger/
│
├── src/
│ ├── main/
│ │ ├── java/com/foodandhunger/
│ │ │ ├── controller/               # REST API endpoints (e.g., DonorController, NGOController)
│ │ │ ├── service/                  # Business logic layer
│ │ │ ├── repository/               # Database interaction (JPA repositories)
│ │ │ ├── model/                    # Entity classes (e.g., User, FoodItem)
│ │ │ ├── dto/                      # Request/Response data transfer objects
│ │ │ ├── exception/                # Global exception handling
│ │ │ ├── config/                   # Security, CORS, and DB configuration
│ │ │ ├── util/                     # Utility classes and constants
│ │ │ └── FoodAndHungerApplication.java # Main entry point
│ │ └── resources/
│ │ ├── application.yml             # Environment configurations
│ │ ├── static/                     # (Optional) Static files
│ │ └── templates/                  # (Optional) Thymeleaf templates
│ └── test/java/com/foodandhunger/
│ └── ... # Unit and integration tests
│
├── pom.xml                         # Maven dependencies
└── README.md                       # Project documentation

```

## ⚙️ Tech Stack

- **Backend:** Spring Boot 3.x
- **Language:** Java 17+
- **Database:** MySQL
- **Security:** Spring Security + JWT
- **Build Tool:** Maven
- **Validation:** Jakarta Validation
- **ORM:** JPA / Hibernate

## Setup Instructions

1. Clone the repository

   ```bash
   git clone https://github.com/<your-repo>/foodandhunger.git
   cd foodandhunger
   ```

2. Configure the database in `application.yml`

   ```yaml
   spring:
     datasource:
       url: jdbc:mysql://localhost:3306/foodandhunger
       username: root
       password: yourpassword
     jpa:
       hibernate:
         ddl-auto: update
   ```

3. Build and run

   ```bash
   mvn spring-boot:run
   ```

4. Test endpoint

   ```
   GET http://localhost:8080/api/hello
   ```

## Coding Guidelines

- Keep all code under `com.foodandhunger` package.
- Use `@Service` for logic and `@Repository` for data access.
- Always use DTOs to transfer data between client and server.
- Handle all errors in `exception/` package with a global handler.
- Use `ResponseEntity` for all API responses.

---

## 👥 Team Notes

- Follow this structure strictly to maintain clean code.
- New modules (like Authentication, Donation Flow, NGO Verification) should have their own controller/service pair.
- Create separate branches for features before merging to main.

Made with ❤️ by Team Food&hunger
