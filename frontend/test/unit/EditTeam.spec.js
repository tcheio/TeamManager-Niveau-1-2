import { mount } from '@vue/test-utils';
import EditTeam from '@/components/EditTeam.vue';
import axios from 'axios';

jest.mock('axios');

describe('EditTeam.vue', () => {
  it('devrait charger l\'équipe et les membres au montage', async () => {
    const teamData = { name: 'Test Team', description: 'Description test' };
    const membersData = [{ name: 'Member 1' }, { name: 'Member 2' }];

    axios.get.mockResolvedValueOnce({ data: teamData });
    axios.get.mockResolvedValueOnce({ data: membersData });

    const wrapper = mount(EditTeam, {
      mocks: {
        $http: axios,
        $route: { params: { id: 'teamId' } },
      },
    });

    await wrapper.vm.$nextTick(); // Attends que la promesse soit résolue

    expect(wrapper.vm.team.name).toBe('Test Team');
    expect(wrapper.vm.members.length).toBe(2);
  });

  it('devrait ajouter un membre', async () => {
    const wrapper = mount(EditTeam, {
      mocks: {
        $http: axios,
        $route: { params: { id: 'teamId' } },
      },
    });

    wrapper.setData({ newMember: 'New Member' });

    axios.post.mockResolvedValueOnce({
      data: { member: { name: 'New Member', idTeam: 'teamId' } },
    });

    await wrapper.vm.addMember();
    expect(wrapper.vm.members.length).toBe(1);
    expect(wrapper.vm.newMember).toBe('');
  });
});
