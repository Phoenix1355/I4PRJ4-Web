import { mount } from '@vue/test-utils'
import Container from '@/components/Container';

describe('Container', () => {
    test('is a Vue instance', () => {
        const wrapper = mount(Container);
        expect(wrapper.isVueInstance()).toBeTruthy();
    });
});
