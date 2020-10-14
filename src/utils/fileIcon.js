const fileIcon = (fileType) => {
  switch (fileType) {
    case 'txt':
      return 'img/text.png';

    case 'md':
      return 'img/text.png';

    case 'png':
      return 'img/image.png';

    case 'jpg':
      return 'img/image.png';

    default:
      return '';
  }
};

export default fileIcon;
