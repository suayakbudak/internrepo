export const endpoints = {
  get: {
    auth: {
      tokenRefresh: "/auth/token-refresh",
    },
    users: {
      me: "/users/me",
      profile: (id) => `/users/${id}/profile`,
      posts: (id) => `/users/${id}/posts`,
      media: (id) => `/users/${id}/posts/media`,
      all: "/users",
    },
    surveys: {
      root: "/surveys",
      id: (id) => `/surveys/${id}`,
      questions: (id) => `/surveys/${id}/questions`,
      responses: (id) => `/surveys/${id}/responses`,
    },
    boards: {
      columns: (id) => `/boards/${id}/columns`,
      tasks: (id) => `/boards/${id}/tasks`,
    },
    tasks: {
      id: (id) => `/tasks/${id}`,
      completion: (id) => `/tasks/${id}/completionStatus`,
    },
    activities: {
      root: "/activities",
    },
    categories: {
      root: "/categories",
      features: (id) => `/categories/${id}/features`,
    },
    adFeatures: {
      id: (id) => `/ad-features/${id}`,
    },
    advert: {
      all: "/advert/all",
    },
    projects: {
      root: "/projects",
      id: (id) => `/projects/${id}`,
      backlog: (id) => `/projects/${id}/backlog`,
    },
    file: {
      list: "/api/files/list",
      id: (id) => `/api/files/detail/${id}`,
      download: (id) => `/api/files/download/${id}`,
    },
    notifications: {
      list: "/notifications/list",
    },
    notificationTypes: {
      list: "/notification-types",
      id: (id) => `/notification-types/${id}`,
    },
    notificationTriggerTypes: {
      list: "/notification-trigger-types",
      id: (id) => `/notification-trigger-types/${id}`,
    },
  },
  post: {
    auth: {
      signUp: "/auth/register",
      signIn: "/auth/login",
      forgotPassword: "/auth/forgot-password",
      resetPassword: "/auth/reset-password",
      verifyCode: "/auth/verify-code",
    },
    users: {
      // ! Should be get
      me: "/users/me",
      profile: (id) => `/users/${id}/profile`,
    },
    surveys: {
      create: "/surveys",
      createQuestion: (id) => `/surveys/${id}/questions`,
      createResponse: (id) => `/surveys/${id}/responses`,
    },
    boards: {
      create: "/boards",
      createColumn: (id) => `/boards/${id}/columns`,
    },
    tasks: {
      create: "/tasks",
      addAttachments: (id) => `/tasks/${id}/add-attachments`,
      removeAttachments: (id) => `/tasks/${id}/remove-attachments`,
      addAssigners: (id) => `/tasks/${id}/add-assigner`,
      removeAssigners: (id) => `/tasks/${id}/remove-assigner`,
      subTasks: (id) => `/tasks/${id}/subtasks`,
      comments: (id) => `/tasks/${id}/comments`,
      addAttachmentToComment: (commentId) => `/tasks/${commentId}/comments/add-attachment`,
      removeAttachmentFromComment: (commentId) => `/tasks/${commentId}/comments/remove-attachment`,
    },
    adFeatures: {
      create: "/ad-features/create",
    },
    advert: {
      create: "/advert",
    },
    adImages: {
      create: "/ad-images",
    },
    projects: {
      create: "/projects",
      addAssigners: (id) => `/projects/${id}/add-assigners`,
      removeAssigners: (id) => `/projects/${id}/remove-assigners`,
    },
    posts: {
      create: "/posts/create",
      like: (id) => `/posts/${id}/likes`,
      comment: (id) => `/posts/${id}/comments`,
    },
    file: {
      share: "/api/files/share",
    },
    notifications: {
      create: "/notifications/create",
    },
    notificationTypes: {
      create: "/notification-types",
    },
    notificationTriggerTypes: {
      create: "/notification-trigger-types",
    },
  },
  put: {
    users: {
      update: "/users/update",
      profile: (id) => `/users/${id}/profile/edit`,
    },
    surveys: {
      update: (id) => `/surveys/${id}`,
      updateQuestion: (id, questionId) => `/surveys/${id}/questions/${questionId}`,
      updateResponse: (id, responseId) => `/surveys/${id}/responses/${responseId}`,
    },
    boards: {
      id: (id) => `/boards/${id}`,
      column: (id, columnId) => `/boards/${id}/columns/${columnId}`,
    },
    tasks: {
      id: (id) => `/tasks/${id}`,
      comment: (id, commentId) => `/tasks/${id}/comments/${commentId}`,
    },
    projects: {
      id: (id) => `/projects/${id}`,
    },
    notificationTypes: {
      update: (id) => `/notification-types/${id}`,
    },
    notificationTriggerTypes: {
      update: (id) => `/notification-trigger-types/${id}`,
    },
  },
  patch: {
    boards: {
      addTask: (id) => `/boards/${id}/tasks/add`,
      removeTask: (id) => `/boards/${id}/tasks/remove`,
    },
    tasks: {
      updateStatus: (id) => `/tasks/${id}/status`,
    },
    notifications: {
      updateStatus: "/notifications/update-status",
    },
  },
  delete: {
    surveys: {
      id: (id) => `/surveys/${id}`,
      question: (id, questionId) => `/surveys/${id}/questions/${questionId}`,
    },
    boards: {
      id: (id) => `/boards/${id}`,
      column: (id, columnId) => `/boards/${id}/columns/${columnId}`,
    },
    tasks: {
      comment: (id, commentId) => `/tasks/${id}/comments/${commentId}`,
    },
    projects: {
      id: (id) => `/projects/${id}`,
    },
    file: {
      delete: "/api/files/delete",
    },
    notifications: {
      delete: "/notifications/delete",
    },
  },
};
