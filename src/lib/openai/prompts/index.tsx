import { ReviewRequestSchemaType } from "@/entities/review";
import { getRandomAlphabetExceptX } from "@/lib/characters";

const addAdditionalQualities = (rating: number) => {
  if (rating < 3) {
    return "";
  }

  return `Emphasize any one of the following qualities:
    Friendless Staff
    Professional Doctors
    Facility 
    modern
    Trustworthy
    Reliable
    accomplished
    admirable
    attractive
    distinguished
    exceptional
    exemplary
    exquisite
    fine
    finest
    first-rate
    good
    great
    magnificent
    outstanding
    skilful
    sterling
    superb
    superlative
    A-1
    capital
    certified
    champion
    choice
    choicest
    desirable
    distinctive
    estimable
    first
    first-class
    high
    hotdog
    incomparable
    invaluable
    meritorious
    notable
    noted
    peerless
    premium
    priceless
    prime
    quality
    select
    striking
    supreme
    tiptop
    top-notch
    transcendent
    world-class
    accurate
    authentic
    authoritative
    believable
    convincing
    credible
    dependable
    ethical
    honest
    honourable
    mature
    principled
    realistic
    responsible
    sensible
    truthful
    upright
    valid
    worthy`;
};

export const ApolloDentalPrompt = (requestReview: ReviewRequestSchemaType) => {
  return `Write a Google Reviews review for ${requestReview.name} in ${
    requestReview.location
  },

    Follow the below rules:
    Start the review with the word starting with ${getRandomAlphabetExceptX()}
    
    Keep it simple, precise
    Make sure the review is simple select a length of 50 words
    Give a review based on a rating for ${requestReview.rating}/5
    Tell stories and your experience
    Dont be repetitive
    use smileys and emojis somewhere in the middle to highlight some words 
    Write it like a human
    
    ${addAdditionalQualities(requestReview.rating)}`;
};
