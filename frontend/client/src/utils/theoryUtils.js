// Templates for conspiracy theory generation
const theoryTemplates = [
    "Did you know that {keyword1} is actually controlled by {keyword2}? The evidence dates back to {year}. Insiders claim that {keyword3} was created to distract us from this truth.",
    "The secret connection between {keyword1} and {keyword2} has been hidden from the public for decades. Research suggests that {keyword3} was engineered to cover up this relationship.",
    "Government documents reveal that {keyword1} was invented by {keyword2} to monitor {keyword3}. This operation has been active since {year} and explains why {keyword4} keeps appearing in the media.",
    "The real reason {keyword1} exists is to collect data for {keyword2}. This conspiracy began when {keyword3} mysteriously gained popularity in {year}.",
    "What if {keyword1} isn't what we think? Evidence suggests it's a front for {keyword2} operations targeting {keyword3}. The truth has been hidden since {year}.",
    "Declassified files show that {keyword1} was designed by {keyword2} to influence {keyword3}. The program started in {year} and explains the strange connection to {keyword4}.",
    "The elite don't want you to know that {keyword1} is actually manipulated by {keyword2} to control {keyword3}. This has been happening since {year}.",
    "Investigations reveal that {keyword1} was created as a distraction from the activities of {keyword2}. This explains why {keyword3} suddenly changed in {year}.",
    "The connection between {keyword1} and {keyword2} isn't coincidental. Experts who studied {keyword3} have disappeared after discovering the truth.",
    "The real purpose of {keyword1} is to gather information for {keyword2}. This operation has been running since {year} and involves key figures in {keyword3}."
  ];
  
  const generateYear = () => {
    return Math.floor(Math.random() * 70) + 1950;
  };
  
  export const generateTheory = async (keywords) => {
    if (!keywords.trim()) {
      throw new Error('Please enter at least one keyword');
    }
    
    // Split keywords by commas and clean them up
    const keywordList = keywords.split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0);
    
    if (keywordList.length === 0) {
      throw new Error('Please enter valid keywords');
    }
    
    // Get random template
    const template = theoryTemplates[Math.floor(Math.random() * theoryTemplates.length)];
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Fill in the template
    let result = template;
    const year = generateYear();
    
    // Replace keyword placeholders
    for (let i = 1; i <= 4; i++) {
      const placeholder = `{keyword${i}}`;
      if (result.includes(placeholder)) {
        // Use available keywords or random selection if we run out
        const keyword = keywordList[(i-1) % keywordList.length];
        result = result.replace(placeholder, keyword);
      }
    }
    
    // Replace year placeholder
    result = result.replace('{year}', year);
    
    // Create theory object
    return {
      id: Date.now(),
      title: `The Truth About ${keywordList[0]}`,
      content: result,
      keywords: keywordList,
      likes: Math.floor(Math.random() * 100)
    };
  };