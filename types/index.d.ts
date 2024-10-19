export declare namespace Types {
    // General reusable types
    type Nullable<T> = T | undefined;
    type StringOrNumber = string | number;

    // Non-empty string type
    type NonEmptyString<T extends string> = T extends '' ? never : T;

    // Job-related types
    type JobTitle = Nullable<NonEmptyString<string>>;
    type JobDescription = Nullable<NonEmptyString<string>>;
    type JobLocation = Nullable<NonEmptyString<string>>;
    type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship';

    // Interface for a Job Listing
    interface JobListingType {
        id: StringOrNumber;
        title: JobTitle;
        description: JobDescription;
        location: JobLocation;
        type: JobType;
    }

    // Utility types for required or optional fields in JobListing
    type RequiredJobFields = Required<Pick<JobListing, 'id' | 'title' | 'type'>>;
    type OptionalJobFields = Partial<Omit<JobListing, 'id' | 'title' | 'type'>>;

    // Full Job Type with required and optional fields
    interface FullJobType extends RequiredJobFields, OptionalJobFields {}

    // Utility to create flexible JobType
    type JobFactory<T extends JobListing = JobListing> = T;

    // Game-related types
    type TitleType = Nullable<NonEmptyString<string>>;
    type DescriptionType = Nullable<NonEmptyString<string>>;
    type ImageType = NonEmptyString<string>;
    type LinkType = Nullable<NonEmptyString<string>>;
    type PlayersType = Nullable<StringOrNumber>;
    type RatingType = Nullable<NonEmptyString<string>>;
    
    // Genre definition
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
    interface BaseGameType {
        title?: TitleType;
        description?: DescriptionType;
        image?: ImageType;
        link?: LinkType;
        players?: PlayersType;
        rating?: RatingType;
        genre?: Genre;
    }

    // Utility types for required or partial variants
    type RequiredGameFields = Required<Pick<BaseGameType, 'title' | 'genre'>>;
    type OptionalGameFields = Partial<Omit<BaseGameType, 'title' | 'genre'>>;

    // Intersection of required and optional fields for GameType
    interface GameType extends RequiredGameFields, OptionalGameFields {}

    // Utility to create flexible GameType
    type GameFactory<T extends BaseGameType = BaseGameType> = T;

    // Team member types
    type MemberName = Nullable<NonEmptyString<string>>;
    type MemberRole = Nullable<NonEmptyString<string>>;
    type MemberImage = Nullable<NonEmptyString<string>>;
    type MemberLink = Nullable<NonEmptyString<string>>;

    // Team member interface
    interface TeamMemberType {
        name: MemberName;
        role: MemberRole;
        image: MemberImage;
        link: MemberLink;
    }
}
