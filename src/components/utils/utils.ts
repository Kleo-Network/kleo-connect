import { CardTypeToRender, PendingCard, PublishedCard } from "../common/interface"

export function getKeyByValue<T extends string>(
  enumObj: Record<string, T>,
  value: T
): keyof typeof enumObj | undefined {
  return Object.keys(enumObj).find((key) => enumObj[key] === value)
}

export function getVisitTime(visitTime: string): string {
  const date = new Date(parseInt(visitTime))
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export function replaceSlugInURL(url: string, slug?: string) {
  const final_slug = slug || localStorage.getItem('slug') || ''
  return url.replace('{slug}', final_slug)
}

// Constant for milliseconds in a day
const MILLISECONDS_IN_A_DAY = 1000 * 3600 * 24;

export function getDaysAgo(date: string | number, currentTimestamp: number = Date.now()): string {
  const givenDate = new Date(date);
  const differenceInTime = currentTimestamp - givenDate.getTime(); // date is already a timestamp
  const differenceInDays = Math.floor(differenceInTime / MILLISECONDS_IN_A_DAY);

  if (differenceInDays === 0) {
    return 'Today';
  } else if (differenceInDays === 1) {
    return '1 day ago';
  } else if (differenceInDays <= 30) {
    return `${differenceInDays} days ago`;
  } else {
    return givenDate.toLocaleDateString('default', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }
}

export function getDateAndMonth (date: number | undefined) {
  if (date) {
    const givenDate = new Date(date * 1000)
    return `${givenDate.getDate()} ${givenDate.toLocaleString('default', {
      month: 'long'
    })}`
  }
}

export const extractThumbNailURL = (videoURL: string) => {
    let videoId: string | undefined;
    if (videoURL.includes("youtu.be")) {
        // Handle the shortened youtu.be URLs
        videoId = videoURL.split("youtu.be/")[1]?.split("?")[0];
    } else if (videoURL.includes("youtube.com")) {
        // Handle the standard youtube.com URLs
        videoId = videoURL.split("v=")[1]?.split("&")[0];
    }
    const thumbUrl = videoId ? `https://img.youtube.com/vi/${videoId}/default.jpg` : '';
    return thumbUrl;
}

export function parseUrl(url: string): string {
  try {
    // Ensure the URL starts with http:// or https://
    const formattedUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `http://${url}`;

    // Parse the URL
    const { hostname } = new URL(formattedUrl);
    const hostParts = hostname.split('.');
    const n = hostParts.length;

    // Determine the domain
    if (n < 2) return hostname; // If there are less than 2 parts, return the hostname as is

    return n === 4 || (n === 3 && hostParts[n - 2].length <= 3)
      ? `${hostParts[n - 3]}.${hostParts[n - 2]}.${hostParts[n - 1]}`
      : `${hostParts[n - 2]}.${hostParts[n - 1]}`;
  } catch (error) {
    console.error('Invalid URL:', url, error);
    return ''; // Return an empty string or handle as needed
  }
}

export function formatDate (epoch: number): string {
  const date = new Date(epoch * 1000) // Convert epoch to milliseconds

  const day = String(date.getDate()).padStart(2, '0') // Ensure two digits for day
  const year = date.getFullYear()

  return `${day} ${new Date(epoch * 1000).toLocaleDateString('en-US', {
    month: 'long'
  })} ${year}`
}

export function updateCardTypeToRenderInAllCards(data: PendingCard[] | PublishedCard[]) {
  return data.map(cardItem => {
    // Determine the card type to render
    const cardTypeToRender = cardItem.urls?.some(url => url.url.includes('youtu.be') || url.url.includes('youtube.com'))
      ? CardTypeToRender.YT
      : cardItem.cardType === 'ImageCard'
      ? CardTypeToRender.IMAGE
      : CardTypeToRender.DATA;

    // Return the updated card item with the determined card type
    return {
      ...cardItem,
      cardTypeToRender,
    };
  });
}