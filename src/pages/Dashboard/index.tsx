import React from 'react';

import Header from '../../components/Header';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';

import api from '../../services/api';

import { TFood } from '../../types'

import { FoodsContainer } from './styles';

const Dashboard = () => {
  const [foods, setFoods] = React.useState<TFood[]>([]);
  const [editingFood, setEditingFood] = React.useState<TFood>({
    id: 0,
    available: false,
    description: '',
    image: '',
    name: '',
    price: '',
  });
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = React.useState<boolean>(false);

  const getFoods = React.useCallback(async () => {
    const response = await api.get('/foods');
    setFoods(response.data);  
  }, []);

  React.useEffect(() => {
    getFoods()
  }, [getFoods]);

  const handleAddFood = async (food: TFood) => {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdateFood = async (food: TFood) => {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  }

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  }

  const handleEditFood = (food: TFood) => {
    setEditingFood(food);
    setEditModalOpen(true);
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
              available={food.available}
            />
          ))}
      </FoodsContainer>
    </>
  );
}

export default Dashboard;
