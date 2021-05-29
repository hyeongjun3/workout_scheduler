/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateDailyInfo = /* GraphQL */ `
  subscription OnCreateDailyInfo {
    onCreateDailyInfo {
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
export const onUpdateDailyInfo = /* GraphQL */ `
  subscription OnUpdateDailyInfo {
    onUpdateDailyInfo {
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
export const onDeleteDailyInfo = /* GraphQL */ `
  subscription OnDeleteDailyInfo {
    onDeleteDailyInfo {
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
