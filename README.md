# Express Project for practice

## How to run

1. Clone the repository
2. Run `npm install`
3. Run `npm start`

## Database Schema

This project uses MongoDB to manage teacher, class, course, and student data. Below is an explanation of each collection, including their fields, types, and relationships.

### Collections and Schemas

#### 1. Teacher Collection
Stores information about teachers.

**Schema:**
| Field         | Type    | Description           |
|---------------|---------|-----------------------|
| `_id`         | ObjectId| Unique identifier     |
| `name`        | String  | Name of the teacher   |
| `email`       | String  | Email address         |
| `contactNumber` | String | Contact number        |

**Example Document:**
```
{
  "_id": ObjectId("teacherId1"),
  "name": "John Doe",
  "email": "john.doe@example.com",
  "contactNumber": "123-456-7890"
}
```

#### 2. Class Collection
Stores information about classes.

**Schema:**
| Field             | Type    | Description                |
|-------------------|---------|----------------------------|
| `_id`             | ObjectId| Unique identifier          |
| `name`            | String  | Name of the class          |
| `inchargeTeacherId` | ObjectId | References `_id` in Teacher collection |

**Example Document:**
```
{
  "_id": ObjectId("classId1"),
  "name": "Math 101",
  "inchargeTeacherId": ObjectId("teacherId1")
}
```

#### 3. Course Collection
Stores information about courses.

**Schema:**
| Field     | Type    | Description                |
|-----------|---------|----------------------------|
| `_id`     | ObjectId| Unique identifier          |
| `name`    | String  | Name of the course         |
| `teacherId` | ObjectId | References `_id` in Teacher collection |
| `classId` | ObjectId | References `_id` in Class collection |

**Example Document:**
```
{
  "_id": ObjectId("courseId1"),
  "name": "Algebra",
  "teacherId": ObjectId("teacherId1"),
  "classId": ObjectId("classId1")
}
```

#### 4. Student Collection
Stores information about students.

**Schema:**
| Field      | Type    | Description                |
|------------|---------|----------------------------|
| `_id`      | ObjectId| Unique identifier          |
| `name`     | String  | Name of the student        |
| `rollNumber` | String | Roll number               |
| `classId`  | ObjectId | References `_id` in Class collection |

**Example Document:**
```
{
  "_id": ObjectId("studentId1"),
  "name": "Jane Smith",
  "rollNumber": "2024A001",
  "classId": ObjectId("classId1")
}
```

### Relationships

- **Teacher and Class**: Each class has an `inchargeTeacherId` that references a teacher's `_id` in the Teacher collection.
- **Teacher and Course**: Each course has a `teacherId` that references a teacher's `_id` in the Teacher collection.
- **Class and Course**: Each course has a `classId` that references a class's `_id` in the Class collection.
- **Class and Student**: Each student has a `classId` that references a class's `_id` in the Class collection.

### Example JSON Documents

**Teacher:**
```
{
  "_id": ObjectId("teacherId1"),
  "name": "John Doe",
  "email": "john.doe@example.com",
  "contactNumber": "123-456-7890"
}
```

**Class:**
```
{
  "_id": ObjectId("classId1"),
  "name": "Math 101",
  "inchargeTeacherId": ObjectId("teacherId1")
}
```

**Course:**
```
{
  "_id": ObjectId("courseId1"),
  "name": "Algebra",
  "teacherId": ObjectId("teacherId1"),
  "classId": ObjectId("classId1")
}
```

**Student:**
```
{
  "_id": ObjectId("studentId1"),
  "name": "Jane Smith",
  "rollNumber": "2024A001",
  "classId": ObjectId("classId1")
}
```
