export declare namespace Types {
    type Nullable<T> = T | undefined;
    type StringOrNumber = string | number;

    type NonEmptyString<T extends string> = T extends '' ? never : T;

    type TitleType = Nullable<NonEmptyString<string>>;
    type DescriptionType = Nullable<NonEmptyString<string>>;
    type ImageType = NonEmptyString<string>;
    type LinkType = Nullable<NonEmptyString<string>>;
    type PlayersType = Nullable<StringOrNumber>;
    type RatingType = Nullable<NonEmptyString<string>>;
    
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

    // Intersection of required and optional fields
    interface GameType extends RequiredGameFields, OptionalGameFields {}

    // Utility to create flexible GameType
    type GameFactory<T extends BaseGameType = BaseGameType> = T;
}
