/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      email
      nickname
      gender
      dailyInfos {
        items {
          id
          date
          weight
          userEmail
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      email
      nickname
      gender
      dailyInfos {
        items {
          id
          date
          weight
          userEmail
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      email
      nickname
      gender
      dailyInfos {
        items {
          id
          date
          weight
          userEmail
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createDailyInfo = /* GraphQL */ `
  mutation CreateDailyInfo(
    $input: CreateDailyInfoInput!
    $condition: ModelDailyInfoConditionInput
  ) {
    createDailyInfo(input: $input, condition: $condition) {
      id
      date
      weight
      userEmail
      user {
        email
        nickname
        gender
        dailyInfos {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateDailyInfo = /* GraphQL */ `
  mutation UpdateDailyInfo(
    $input: UpdateDailyInfoInput!
    $condition: ModelDailyInfoConditionInput
  ) {
    updateDailyInfo(input: $input, condition: $condition) {
      id
      date
      weight
      userEmail
      user {
        email
        nickname
        gender
        dailyInfos {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteDailyInfo = /* GraphQL */ `
  mutation DeleteDailyInfo(
    $input: DeleteDailyInfoInput!
    $condition: ModelDailyInfoConditionInput
  ) {
    deleteDailyInfo(input: $input, condition: $condition) {
      id
      date
      weight
      userEmail
      user {
        email
        nickname
        gender
        dailyInfos {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
