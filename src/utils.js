const manipulateInfo = info =>
  info
    .split(" [")[0]
    .split(" (")[0]
    .split(" :")[0];

const appendArtworkDate = (tweet, date) =>
  date ? `${tweet} (${date})` : ["", tweet].join("");

const appendMediumAndArtworkImageRights = (tweet, medium, imageRights) =>
  tweet +
  "\n\n" +
  (medium.split(",")[0].length > 0
    ? manipulateInfo(medium) + ` / ${manipulateInfo(imageRights)}`
    : manipulateInfo(imageRights));

const appendHashtags = (tweet, category) =>
  tweet +
  "\n\n#Art" +
  (category.length > 0
    ? " " +
      category
        .split(", ")
        .filter(cat => cat.split(" ").length === 1)
        .map(cat => cat.replace(/^/, "#"))
        .join(" ")
    : "");

module.exports = {
  manipulateInfo,
  appendArtworkDate,
  appendMediumAndArtworkImageRights,
  appendHashtags
};
