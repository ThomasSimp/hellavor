export declare namespace Types {
    // General reusable types

    /**
     * Nullable<T> represents a type that can either be of type T or undefined.
     * This is useful for defining optional properties or values that may not always be present.
     * 
     * @template T The base type that can be nullable.
     */
    type Nullable<T> = T | undefined;

    /**
     * StringOrNumber is a union type that allows a value to be either a string or a number.
     * This is particularly useful in scenarios where identifiers or values can be represented 
     * in either format (e.g., IDs that can be numeric or string-based).
     */
    type StringOrNumber = string | number;

    // Non-empty string type

    /**
     * NonEmptyString<T> is a conditional type that ensures a string is not empty.
     * If T extends an empty string, it resolves to never, effectively preventing 
     * the usage of empty strings in the application.
     * 
     * @template T The string type to check for non-emptiness.
     */
    type NonEmptyString<T extends string> = T extends '' ? never : T;

    // Job-related types

    /**
     * JobTitle represents the title of a job listing, which can be nullable 
     * and should be a non-empty string if provided.
     */
    type JobTitle = Nullable<NonEmptyString<string>>;

    /**
     * JobDescription represents the description of a job listing, 
     * which can be nullable and should be a non-empty string if provided.
     */
    type JobDescription = Nullable<NonEmptyString<string>>;

    /**
     * JobLocation represents the geographical location of a job listing, 
     * which can be nullable and should be a non-empty string if provided.
     */
    type JobLocation = Nullable<NonEmptyString<string>>;

    /**
     * JobType defines the various types of employment arrangements available for a job listing.
     * Possible values include:
     * - Full-time
     * - Part-time
     * - Contract
     * - Freelance
     * - Internship
     */
    type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship';

    // Interface for a Job Listing

    /**
     * JobListingType defines the structure of a job listing object.
     * Each job listing must have an ID, title, and type, with optional description and location.
     */
    interface JobListingType {
        id: StringOrNumber;               // Unique identifier for the job listing
        title: JobTitle;                  // Title of the job, must be a non-empty string if provided
        description: JobDescription;      // Description of the job, must be a non-empty string if provided
        location: JobLocation;            // Location of the job, must be a non-empty string if provided
        type: JobType;                    // Type of job (e.g., Full-time, Part-time, etc.)
    }

    // Utility types for required or optional fields in JobListing

    /**
     * RequiredJobFields utility type extracts the required fields from the JobListingType,
     * ensuring that ID, title, and type must always be provided when creating or manipulating job listings.
     */
    type RequiredJobFields = Required<Pick<JobListingType, 'id' | 'title' | 'type'>>;

    /**
     * OptionalJobFields utility type extracts the optional fields from the JobListingType,
     * allowing for flexibility in job listing creation while keeping required fields intact.
     */
    type OptionalJobFields = Partial<Omit<JobListingType, 'id' | 'title' | 'type'>>;

    // Full Job Type with required and optional fields

    /**
     * FullJobType combines both required and optional job listing fields,
     * providing a complete structure for job listing operations.
     */
    interface FullJobType extends RequiredJobFields, OptionalJobFields {}

    // Utility to create flexible JobType

    /**
     * JobFactory allows the creation of flexible JobListing objects, enabling developers 
     * to define job listings with varying structures based on the JobListing interface.
     * 
     * @template T The specific type of job listing, extending JobListingType.
     */
    type JobFactory<T extends JobListingType = JobListingType> = T;

    // Game-related types

    /**
     * TitleType represents the title of a game, which can be nullable and must be 
     * a non-empty string if provided.
     */
    type TitleType = Nullable<NonEmptyString<string>>;

    /**
     * DescriptionType represents the description of a game, which can be nullable 
     * and must be a non-empty string if provided.
     */
    type DescriptionType = Nullable<NonEmptyString<string>>;

    /**
     * ImageType represents the image associated with a game, which must be a 
     * non-empty string to ensure an image URL is always provided.
     */
    type ImageType = NonEmptyString<string>;

    /**
     * LinkType represents a link to the game, which can be nullable and must be a 
     * non-empty string if provided.
     */
    type LinkType = Nullable<NonEmptyString<string>>;

    /**
     * PlayersType represents the number of players associated with a game,
     * which can be nullable and is represented as either a string or a number.
     */
    type PlayersType = Nullable<StringOrNumber>;

    /**
     * RatingType represents the rating of a game, which can be nullable and must be 
     * a non-empty string if provided.
     */
    type RatingType = Nullable<NonEmptyString<string>>;

    // Genre definition

    /**
     * Genre defines the various categories a game can belong to, allowing for a wide range 
     * of gaming experiences. Possible genres include:
     * - Action
     * - Adventure
     * - Role-Playing
     * - Simulation
     * - Strategy
     * - Sports
     * - Puzzle
     * - Shooter
     * - Fighting
     * - Racing
     * - Platformer
     * - MMORPG
     * - MOBA
     * - Survival
     * - Horror
     * - Casual
     * - Sandbox
     * - Visual Novel
     * - Roguelike
     * - Turn-Based Strategy
     */
    type Genre = 
        | 'Action'
        | 'Adventure'
        | 'Role-Playing'
        | 'Simulation'
        | 'Strategy'
        | 'Sports'
        | 'Puzzle'
        | 'Shooter'
        | 'Fighting'
        | 'Racing'
        | 'Platformer'
        | 'MMORPG'
        | 'MOBA'
        | 'Survival'
        | 'Horror'
        | 'Casual'
        | 'Sandbox'
        | 'Visual Novel'
        | 'Roguelike'
        | 'Turn-Based Strategy';

    // Base game type interface

    /**
     * BaseGameType defines the basic structure of a game object,
     * allowing for optional fields such as title, description, image, etc.
     */
    interface BaseGameType {
        title?: TitleType;               // Title of the game, can be omitted
        description?: DescriptionType;   // Description of the game, can be omitted
        image?: ImageType;               // Image URL for the game, can be omitted
        link?: LinkType;                 // Link to the game, can be omitted
        players?: PlayersType;           // Number of players, can be omitted
        rating?: RatingType;             // Rating of the game, can be omitted
        genre?: Genre;                   // Genre of the game, can be omitted
    }

    // Utility types for required or partial variants

    /**
     * RequiredGameFields utility type extracts the required fields from BaseGameType,
     * ensuring that title and genre must always be provided when creating or manipulating game objects.
     */
    type RequiredGameFields = Required<Pick<BaseGameType, 'title' | 'genre'>>;

    /**
     * OptionalGameFields utility type extracts the optional fields from BaseGameType,
     * allowing for flexibility in game object creation while keeping required fields intact.
     */
    type OptionalGameFields = Partial<Omit<BaseGameType, 'title' | 'genre'>>;

    // Intersection of required and optional fields for GameType

    /**
     * GameType combines both required and optional game fields,
     * providing a complete structure for game-related operations.
     */
    interface GameType extends RequiredGameFields, OptionalGameFields {}

    // Utility to create flexible GameType

    /**
     * GameFactory allows the creation of flexible GameType objects, enabling developers 
     * to define game objects with varying structures based on the BaseGameType interface.
     * 
     * @template T The specific type of game object, extending BaseGameType.
     */
    type GameFactory<T extends BaseGameType = BaseGameType> = T;

    // Team member types

    /**
     * MemberName represents the name of a team member, which can be nullable 
     * and must be a non-empty string if provided.
     */
    type MemberName = Nullable<NonEmptyString<string>>;

    /**
     * MemberRole represents the role of a team member, which can be nullable 
     * and must be a non-empty string if provided.
     */
    type MemberRole = Nullable<NonEmptyString<string>>;

    /**
     * MemberImage represents the image associated with a team member, which can be 
     * nullable and must be a non-empty string if provided.
     */
    type MemberImage = Nullable<NonEmptyString<string>>;

    /**
     * MemberLink represents a link to the team member's profile or portfolio,
     * which can be nullable and must be a non-empty string if provided.
     */
    type MemberLink = Nullable<NonEmptyString<string>>;

    // Team member interface

    /**
     * TeamMemberType defines the structure of a team member object, including 
     * fields for name, role, image, and link. Each field can be nullable.
     */
    interface TeamMemberType {
        name: MemberName;      // Name of the team member, must be provided
        role: MemberRole;      // Role of the team member, must be provided
        image: MemberImage;    // Image of the team member, must be provided
        link: MemberLink;      // Link to the team member's profile, must be provided
    }
}
