import {create} from 'zustand';

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set ({selectedConversation}),
    massages:[],
    setMassages:(massages) => set({massages})
}))

export default useConversation;