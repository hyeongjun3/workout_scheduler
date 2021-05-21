/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($email: AWSEmail!) {
    getUser(email: $email) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $email: AWSEmail
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      email: $email
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        email
        nickname
        gender
        dailyInfos {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDailyInfo = /* GraphQL */ `
  query GetDailyInfo($id: ID!) {
    getDailyInfo(id: $id) {
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
export const listDailyInfos = /* GraphQL */ `
  query ListDailyInfos(
    $filter: ModelDailyInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDailyInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        weight
        userEmail
        user {
          email
          nickname
          gender
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byNickname = /* GraphQL */ `
  query ByNickname(
    $nickname: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byNickname(
      nickname: $nickname
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        email
        nickname
        gender
        dailyInfos {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
