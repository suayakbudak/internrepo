/**
 * @typedef {Object} Project
 * @property {string} id - Unique project ID
 * @property {string} created_at - Creation timestamp
 * @property {string} updated_at - Last update timestamp
 * @property {string} name - Project name
 * @property {string} description - Project description
 * @property {'in_progress'|'upcoming'|'blocked'|'completed'} status - Project status
 * @property {string} start_date - Project start date (ISO string)
 * @property {string} end_date - Project end date (ISO string)
 * @property {string} projectCode - Unique project code
 */

/**
 * @typedef {Object} User
 * @property {string} id - Unique user ID
 * @property {string} firstName - User's first name
 * @property {string} lastName - User's last name
 * @property {string} email - User's email address
 * @property {string} phoneNumber - User's phone number
 * @property {string} profilePhoto - URL to user's profile photo
 * @property {string} about - User's bio/description
 * @property {string} password - User's password (hashed)
 * @property {string} lastVerificationCode - Last verification code sent
 * @property {string} verificationExpire - Verification code expiry timestamp
 * @property {boolean} resetPasswordAllowed - Whether password reset is allowed
 * @property {boolean} isActive - User account status
 * @property {string} lastLogin - Last login timestamp
 * @property {Task[]} tasks - Tasks assigned to user
 * @property {Task[]} createdTasks - Tasks created by user
 * @property {Response[]} responses - User's survey responses
 * @property {string[]} createdProjects - Projects created by user
 * @property {Profile} profile - User's social profile
 * @property {Comment[]} taskComments - Comments made by user on tasks
 * @property {string[]} projects - Projects user is part of
 * @property {string} created_at - Account creation timestamp
 * @property {string} updated_at - Last update timestamp
 */

/**
 * @typedef {Object} Task
 * @property {string} title - Task title
 * @property {string} description - Task description
 * @property {'low'|'medium'|'high'} priority - Task priority level
 * @property {string} due_date - Task due date
 * @property {'daily'|'weekly'|'monthly'} taskPeriod - Task recurrence period
 * @property {string} taskCode - Unique task code
 * @property {Column} column - Board column containing task
 * @property {string[]} assigned_to - IDs of users assigned to task
 * @property {string} created_by - ID of user who created task
 * @property {Activity[]} activities - Task activity history
 * @property {string} project - ID of parent project
 * @property {string[]} subTasks - IDs of sub-tasks
 * @property {string} parentTask - ID of parent task
 * @property {Label[]} labels - Task labels
 * @property {Comment[]} comments - Task comments
 * @property {string[]} attachments - Task attachment URLs
 * @property {string} id - Unique task ID
 * @property {string} created_at - Creation timestamp
 * @property {string} updated_at - Last update timestamp
 */

/**
 * @typedef {Object} Board
 * @property {string} name - Board name
 * @property {string} project - ID of parent project
 * @property {Column[]} columns - Board columns
 * @property {string} id - Unique board ID
 * @property {string} created_at - Creation timestamp
 * @property {string} updated_at - Last update timestamp
 */

/**
 * @typedef {Object} Column
 * @property {string} name - Column name
 * @property {number} limit - Maximum tasks allowed
 * @property {string} board - ID of parent board
 * @property {string[]} tasks - IDs of tasks in column
 * @property {string} id - Unique column ID
 * @property {string} created_at - Creation timestamp
 * @property {string} updated_at - Last update timestamp
 */

/**
 * @typedef {Object} Label
 * @property {string} name - Label name
 * @property {string[]} tasks - IDs of tasks with this label
 * @property {string} project - ID of parent project
 * @property {string} id - Unique label ID
 * @property {string} created_at - Creation timestamp
 * @property {string} updated_at - Last update timestamp
 */

/**
 * @typedef {Object} Activity
 * @property {'created'|'updated'|'deleted'} action - Activity type
 * @property {string} task - ID of related task
 * @property {string} id - Unique activity ID
 * @property {string} created_at - Creation timestamp
 * @property {string} updated_at - Last update timestamp
 */

/**
 * @typedef {Object} Comment
 * @property {string} text - Comment text
 * @property {string} created_by - ID of comment author
 * @property {string} task - ID of related task
 * @property {string[]} attachments - Comment attachment URLs
 * @property {string} id - Unique comment ID
 * @property {string} created_at - Creation timestamp
 * @property {string} updated_at - Last update timestamp
 */

/**
 * @typedef {Object} Profile
 * @property {string} user - ID of profile owner
 * @property {Post[]} posts - User's posts
 * @property {Like[]} likes - User's likes
 * @property {Comment[]} comments - User's comments
 * @property {string} id - Unique profile ID
 * @property {string} created_at - Creation timestamp
 * @property {string} updated_at - Last update timestamp
 */

/**
 * @typedef {Object} Post
 * @property {string} mediaType - Type of media
 * @property {string} mediaURL - URL to media content
 * @property {string} caption - Post caption
 * @property {string} profile - ID of post author's profile
 * @property {Like[]} likes - Post likes
 * @property {Comment[]} comments - Post comments
 * @property {string} id - Unique post ID
 * @property {string} created_at - Creation timestamp
 * @property {string} updated_at - Last update timestamp
 */

/**
 * @typedef {Object} Like
 * @property {string} post - ID of liked post
 * @property {string} profile - ID of user who liked
 * @property {string} id - Unique like ID
 * @property {string} created_at - Creation timestamp
 * @property {string} updated_at - Last update timestamp
 */
