import merge from 'helpful-merge';

import Config       from '../Config/Config';
import IConfig      from '../Config/Interfaces/IConfig';
import EventBinding from '../Events/EventBinding';
import EventManager from '../Events/EventManager';
import Dom          from '../Renderer/Dom';
import Renderer     from '../Renderer/Renderer';
import State        from '../State/State';
import StateManager from '../State/StateManager';
import StateMapper  from '../State/StateMapper';

class Mediator {
    public config: Config;
    public state: State;
    public dom: Dom;
    public eventBindings: EventBinding[];
    public actions: any;

    constructor(selectElement: HTMLSelectElement, options: IConfig) {
        this.config = merge(new Config(), options);
        this.state = StateMapper.mapFromSelect(selectElement);
        this.dom = Renderer.render(this.state, this.config.classNames, selectElement);
        this.actions = StateManager.proxyActions(this.state, Renderer.update.bind(this.dom, this.config.classNames));
        this.eventBindings = EventManager.bindEvents(this.dom, this.actions);
    }

    public destroy() {
        this.eventBindings.forEach(binding => binding.unbind());
    }
}

export default Mediator;