// My class
class GetColorArray {
  backgroundColor = [];
  borderColor = [];
  hoverBackgroundColor = [];
  hoverBorderColor = [];
  Selected = '';
  UnSelected = '';
  constructor(currenttheme) {
    if (currenttheme === 1) {
      this.Selected = '#0c97bea1';
      this.UnSelected = '#0c97be3b';
      this.backgroundColor = [
        "#0c97be3b",
        "#0c97be3b",
        "#0c97be3b",
        "#0c97be3b",
        "#0c97be3b",
        "#0c97be3b",
        "#0c97be3b",
        "#0c97be3b",
        "#0c97be3b",
        "#0c97be3b"
      ];
      this.borderColor = [
        "#21C0D9",
        "#21C0D9",
        "#21C0D9",
        "#21C0D9",
        "#21C0D9",
        "#21C0D9",
        "#21C0D9",
        "#21C0D9",
        "#21C0D9",
        "#21C0D9"
      ];
      this.hoverBackgroundColor = [
        "#0c97bea1",
        "#0c97bea1",
        "#0c97bea1",
        "#0c97bea1",
        "#0c97bea1",
        "#0c97bea1",
        "#0c97bea1",
        "#0c97bea1",
        "#0c97bea1",
        "#0c97bea1"
      ];
      this.hoverBorderColor = [
        "#0B6774",
        "#0B6774",
        "#0B6774",
        "#0B6774",
        "#0B6774",
        "#0B6774",
        "#0B6774",
        "#0B6774",
        "#0B6774",
        "#0B6774"
      ];
    } else {

      this.Selected = '#3AE4FF';
      this.UnSelected = '#CACACA';
      this. backgroundColor = [
        "#3AE4FF",
        "#E8E8E8",
        "#2FE3FF",
        "#D9D9D9",
        "#42E5FF",
        "#CACACA",
        "#525A6B",
        "#21C0D9",
        "#B0B0B0"
      ];
      this. borderColor = [
        "#fff",
        "#fff",
        "#fff",
        "#fff",
        "#fff",
        "#fff",
        "#fff",
        "#fff",
        "#fff",
        "#fff"
      ];
      this. hoverBackgroundColor = [
        "#3AE4FF",
        "#3AE4FF",
        "#3AE4FF",
        "#3AE4FF",
        "#3AE4FF",
        "#3AE4FF",
        "#3AE4FF",
        "#3AE4FF",
        "#3AE4FF",
        "#3AE4FF"
      ];
      this.hoverBorderColor = [
        "#0B6774",
        "#0B6774",
        "#0B6774",
        "#0B6774",
        "#0B6774",
        "#0B6774",
        "#0B6774",
        "#0B6774",
        "#0B6774",
        "#0B6774"
      ];
    }
  }
}
