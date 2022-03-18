export default function navAccordion() {
  return {
    sections: [],
    get fullHeight() {
      return this.$root.clientHeight;
    },
    sectionHeight(index) {
      const section = this.sections[index];
      return section
        ? section.height || this.fullHeight / 2
        : this.fullHeight / 2;
    },
    setSplits(splits) {
      const sectionSplits = [splits[0], splits[2]];
      this.sections.forEach((section, i) => {
        section.height = sectionSplits[i];
      });
    },
  };
}
