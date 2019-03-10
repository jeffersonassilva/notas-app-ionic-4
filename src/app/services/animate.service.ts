import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AnimateService {

    execute(element, animationName, callback = {}) {
        const node = document.querySelector(element);
        node.classList.remove('fadeIn');
        node.classList.add(animationName);

        function handleAnimationEnd() {
            node.classList.remove(animationName);
            node.removeEventListener('animationend', handleAnimationEnd);

            if (typeof callback === 'function') {
                callback();
            }
        }

        node.addEventListener('animationend', handleAnimationEnd);
    }
}
