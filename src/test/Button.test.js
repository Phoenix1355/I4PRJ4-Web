import { mount, shallowMount } from '@vue/test-utils';
import Button from '@/components/Button';

describe('Button', () => {
    test('is a Vue instance', () => {
        const wrapper = mount(Button);
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    test('displays the given children', () => {
        const wrapper = shallowMount(Button, {
            slots: {
                default: 'Click me',
            },
        });
        expect(wrapper.text()).toBe('Click me');
    });
});
