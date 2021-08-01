export interface Deal {
    id: string;
    title: string;
    description: string;
    degree: number;
    price: number;
    shippingFees: number;
    link: string;
    author: string;
    creationDate: Date;
    startingDate: Date;
    endingDate: Date;
}
