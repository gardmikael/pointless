# Pointless

This is a quiz game based on popular BBC game show also named Pointless. In the show there are multiple questions where each question has multiple, but still a set number of answers. A control group consisting of 100 members are asked these questions before the actual show, where each member can give as many correct answers as they can within 100 seconds. Each correct answer is collected and the aggregated result from all the members in the control group constitues the "score" of each answer.

## Example

The question is: Name contries that starts with the letter K

The set of correct answers is:

- Kazakhstan
- Kenya
- Kiribati
- Kuwait
- Kyrgyzstan

The likelyhood that every member in the controll group gets all the answers correct is fairly low, even more so if the question has more correct answers or the set of answers are to be considered more obscure knowledge to the general public.

From our survey group of 100 people, we might get these results:

- Kazakhstan (17)
- Kenya (42)
- Kiribati (0)
- Kuwait (30)
- Kyrgyzstan (7)

This means that of the 100 members in the controll group, 42 of correctly said Kenya. This will be the "least pointless" answer as it will give the contestant the most amount of points (among the correct answers). Kyrgyzstan is a less obvious answer as only 7 members gave this as an answer. No one said Kiribati, which makes this a "pointless" answer. A contestant that gives a pointless answer will recieve 0 points, and the whole premise of the game is to get as few points as possible.

## Note

Getting a control group of 100 people can be tricky. So to create your quiz, you have some other options:

- Ask ChatGpt to act as the control group for you. It will often generate realistic results.
- Use a smaller control group. You decide the size of your control group. Just remember to set the max score to the size of your control group
- Design your questions in a different way. I.e you can ask: Songs on Abbey Road by the Beatles. "Here comes the sun" has the most streams and might be considered more well known by the general public, than say "Her majesty" that is considered a far less know track on the album.
- Use the sample questions from the application. Do note that the scores of each option is randomly created.

## Development

The app is purely front end, with:

- Next.js
- Material UI components

To run a dev server, simply type in the terminal:

```bash
npm run dev
```
