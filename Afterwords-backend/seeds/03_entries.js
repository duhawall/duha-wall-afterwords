/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("entries").del();
  await knex("entries").insert([
    {
      entry_id: "2f8e3f10-b0a7-4c83-bf93-9089f607def7",
      title: "Until We Meet Again",
      content: `Love is not measured in days, but by the moments that touch our hearts. 
      
      It's the quiet understanding, the unspoken connection, the feeling that no matter how far apart we may be, love will keep us tethered together. 
      And though today, we are not in the same room, I feel your presence in everything I do. 
      
      In each passing second, I hold onto the love we shared, waiting for the day we meet again.`,
      timestamp: 1673344800,
      author_id: 1,
      loved_one_id: "101",
    },
    {
      entry_id: "7d3b9cb7-90ea-4bfa-9a51-4c2a4b8d9f2d",
      title: "The Light You Left Behind",
      content: `You were always the warmth I needed, the steady light when everything around me seemed dark. 
      I remember the way your smile could lift my spirits, the way you always knew what to say, even when words were not enough. 
      It's hard to believe that you're no longer here with me, but I know your light will continue to guide me through the darkest of days. 
      
      I will carry your warmth with me, always.`,
      timestamp: 1676477400,
      author_id: 1,
      loved_one_id: "101",
    },
    {
      entry_id: "1f2c7ea9-d052-48e0-8b0c-69085e746d1f",
      title: "If Love Had a Shape",
      content: `I once thought love was a circle,
      endless, unbroken,
      like the way we laughed,
      like the way we always found each other,
      no matter how far we wandered.

      But now, I think love is a thread,
      woven through time,
      binding me to you, even here, even now.
      It stretches across the silence,
      tugs at your heart when you least expect it—
      in a song, in a whisper, in the hush before sleep.

      You do not have to hold onto grief to hold onto me.
      I am not in the past, not in the pain.
      I am in the shape of your days,
      in the way your heart still knows mine.

      And so, if love had a shape,
      it would be you.`,
      timestamp: 1396310400,
      author_id: 1,
      loved_one_id: "102",
    },
    {
      entry_id: "943f13d0-2488-4feb-ab80-101a7db0f9c8",
      title: "A Whisper in the Wind",
      content: `I still reach for your hand, as if you might be there, just beyond my grasp. 
      It’s strange, the way love can linger, even in the absence. 
      The whispers of our moments together, the memories that flicker in the corners of my mind. 
      You are gone, but I still feel your presence in everything I do.

      The wind carries your voice, the stars hold your gaze, 
      and I carry your love in my heart, forever and always.`,
      timestamp: 1680705600,
      author_id: 2,
      loved_one_id: "103",
    },
    {
      entry_id: "922f13d0-2488-4feb-7s81-101a7db0f9c8",
      title: "The Echo of Us",
      content: `Love is not measured in days, but in the ways we carry it with us, 
      long after we think it has faded. Our memories echo in the silence, 
      in the little moments that we often overlook. In the touch of a hand, the smile of a stranger, 
      the fragrance of a flower. I hear you in the whisper of the wind, I see you in the dawn. 

      And though you are no longer here, your love continues to shape my world, like a soft, unspoken echo.`,
      timestamp: 1683528000,
      author_id: 3,
      loved_one_id: "105",
    },
    {
      entry_id: "b4c2e1f8-24a2-467b-bb8b-908cbf7e1234",
      title: "You Are My Always",
      content: `Even in the silence, I feel you with me. 
      You are the constant, the steady presence in my life, even when you are not physically here. 
      I carry the essence of you with me in every breath I take, in every step I make. 
      You are my always, my forever. You are the rhythm of my heart, the beat that keeps me going, 
      no matter the distance or the time that separates us. 
      
      You are always here, in the quiet corners of my soul.`,
      timestamp: 1686611400,
      author_id: 4,
      loved_one_id: "106",
    },
  ]);
}
