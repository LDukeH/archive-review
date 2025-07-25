import { PrismaClient, Prisma } from "../app/generated/prisma";

const prisma = new PrismaClient();

const userData: Prisma.ReviewCreateInput[] = [
  {
    title: "Inception",
    authorName: "Christopher Nolan",
    description:
      "Inception is a 2010 science fiction action heist film written and directed by Christopher Nolan, who also produced it with Emma Thomas, his wife. The film stars Leonardo DiCaprio as a professional thief who steals information by infiltrating the subconscious of his targets. He is offered a chance to have his criminal history erased as payment for the implantation of another person's idea into a target's subconscious. The ensemble cast includes Ken Watanabe, Joseph Gordon-Levitt, Marion Cotillard, Elliot Page, Tom Hardy, Cillian Murphy, Tom Berenger, Dileep Rao, and Michael Caine.",
    coverImage:
      "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
    rating: 4.8,
    ExternalLink: "https://www.imdb.com/title/tt1375666/",
    tags: {
      connect: [{ name: "Sci-Fi" }, { name: "Action" }, { name: "Thriller" }],
    },
    type: "movie",
    story: `Dom Cobb and Arthur are "extractors" who perform corporate espionage using experimental dream-sharing technology to infiltrate their targets' subconscious and extract information. Their latest target, Saito, is impressed with Cobb's ability to layer multiple dreams within each other. He offers to hire Cobb for the ostensibly impossible job of implanting an idea into a person's subconscious; performing "inception" on Robert Fischer, the son of Saito's competitor Maurice Fischer, with the idea to dissolve his father's company. In return, Saito promises to clear Cobb's criminal status, allowing him to return home to his children.`,
    pros: "The film's intricate plot, stunning visuals, and thought-provoking themes make it a masterpiece of modern cinema. The performances, particularly by DiCaprio, are outstanding, and the film's exploration of dreams and reality is both engaging and intellectually stimulating.",
    cons: "Some viewers may find the complex narrative structure and multiple layers of dreams confusing, requiring multiple viewings to fully grasp the story. Additionally, the film's length may be off-putting for some.",
    summary:
      "Inception is a mind-bending thriller that explores the nature of dreams and reality. With its intricate plot and stunning visuals, it takes viewers on a journey through the subconscious mind, challenging their perceptions of what is real and what is not. It deserver a rating of 4.8 out of 5 for its innovative storytelling and captivating performances.",
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.review.create({ data: u });
  }
}

main();
