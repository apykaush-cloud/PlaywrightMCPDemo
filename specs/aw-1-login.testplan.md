# AW-1 User Login Test Plan

## Application Overview

Test plan for AW-1: User Login – CURA Healthcare Service Application. This plan covers all acceptance criteria, edge cases, error handling, and non-functional requirements for the login functionality as described in the Jira user story.

## Test Scenarios

### 1. User Login Functionality

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful Login

**File:** `tests/login/successful-login.spec.ts`

**Steps:**
  1. Navigate to the login page (https://katalon-demo-cura.herokuapp.com/profile.php#login)
    - expect: Login page is displayed with username and password fields and a login button.
  2. Enter valid username: John Doe
    - expect: Username field contains 'John Doe'.
  3. Enter valid password: ThisIsNotAPassword
    - expect: Password field contains masked input.
  4. Click the Login button
    - expect: User is authenticated and redirected to the appointment page.
    - expect: User session is active and visible.

#### 1.2. Invalid Username

**File:** `tests/login/invalid-username.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: Login page is displayed.
  2. Enter invalid username: InvalidUser
    - expect: Username field contains 'InvalidUser'.
  3. Enter valid password: ThisIsNotAPassword
    - expect: Password field contains masked input.
  4. Click the Login button
    - expect: Error message 'Login failed! Please ensure the username and password are valid.' is displayed.
    - expect: User remains on the login page.

#### 1.3. Invalid Password

**File:** `tests/login/invalid-password.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: Login page is displayed.
  2. Enter valid username: John Doe