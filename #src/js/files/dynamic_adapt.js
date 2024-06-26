// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".content__column-garden,992,2"
// https://github.com/FreelancerLifeStyle/dynamic_adapt

class DynamicAdapt {
	constructor(type) {
		this.type = type;
	}

	init() {
		this.оbjects = [];
		this.daClassname = '_dynamic_adapt_';
		this.nodes = [...document.querySelectorAll('[data-da]')];

		this.nodes.forEach((node) => {
			const data = node.dataset.da.trim();
			const dataArray = data.split(',');
			const оbject = {};
			оbject.element = node;
			оbject.parent = node.parentNode;
			оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
			оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
			оbject.place = dataArray[2] ? dataArray[2].trim() : 'last';
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.оbjects.push(оbject);
		});

		this.arraySort(this.оbjects);

		this.mediaQueries = this.оbjects
			.map(({
				breakpoint
			}) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)
			.filter((item, index, self) => self.indexOf(item) === index);

		this.mediaQueries.forEach((media) => {
			const mediaSplit = media.split(',');
			const matchMedia = window.matchMedia(mediaSplit[0]);
			const mediaBreakpoint = mediaSplit[1];

			const оbjectsFilter = this.оbjects.filter(
				({
					breakpoint
				}) => breakpoint === mediaBreakpoint
			);
			matchMedia.addEventListener('change', () => {
				this.mediaHandler(matchMedia, оbjectsFilter);
			});
			this.mediaHandler(matchMedia, оbjectsFilter);
		});
	}

	mediaHandler(matchMedia, оbjects) {
		if (matchMedia.matches) {
			оbjects.forEach((оbject) => {
				оbject.index = this.indexInParent(оbject.parent, оbject.element);
				this.moveTo(оbject.place, оbject.element, оbject.destination);
			});
		} else {
			оbjects.forEach(
				({ parent, element, index }) => {
					if (element.classList.contains(this.daClassname)) {
						this.moveBack(parent, element, index);
					}
				}
			);
		}
	}

	moveTo(place, element, destination) {
		if(!place || !element || !destination) return;

		element.classList.add(this.daClassname);
		if (place === 'last' || place >= destination.children.length) {
			destination.append(element);
			return;
		}
		if (place === 'first') {
			destination.prepend(element);
			return;
		}
		destination.children[place].before(element);
	}

	moveBack(parent, element, index) {
		if(!place || !element || !index) return;
		element.classList.remove(this.daClassname);
		if (parent.children[index] !== undefined) {
			parent.children[index].after(element);
		} else {
			parent.append(element);
		}
	}

	indexInParent(parent, element) {
		return [...parent.children].indexOf(element);
	}

	arraySort(arr) {
		if (this.type === 'min') {
			arr.sort((a, b) => {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}
					if (a.place === 'first' || b.place === 'last') {
						return -1;
					}
					if (a.place === 'last' || b.place === 'first') {
						return 1;
					}
					return a.place - b.place;
				}
				return a.breakpoint - b.breakpoint;
			});
		} else {
			arr.sort((a, b) => {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}
					if (a.place === 'first' || b.place === 'last') {
						return 1;
					}
					if (a.place === 'last' || b.place === 'first') {
						return -1;
					}
					return b.place - a.place;
				}
				return b.breakpoint - a.breakpoint;
			});
			return;
		}
	}
}
