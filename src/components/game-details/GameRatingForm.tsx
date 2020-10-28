import React, { useState } from 'react';
import { Formik } from 'formik';
import { Input, Rate, Button } from 'antd';

import Rating from '../../models/Rating';
import { useParams } from 'react-router-dom';
import httpService from '../../services/httpService';
import notification from '../../services/notification';
import Game from '../../models/Game';

const { TextArea } = Input;

type Props = {
  onRateAdd(rating: Game): void;
}

const GameRatingForm: React.FC<Props> = ({ onRateAdd }) => {
  const [collapes, setCollapse] = useState(false)
  const { id } = useParams();

  const initValues: Rating = {
    addedDate: new Date().toString(),
    rating: 3,
    reason: '',
    userName: ''
  }

  const handleFormSubmit = async (values: Rating) => {
    try {
      const { data } = await httpService.put(`/api/Games/Rate/${id}`, { ...values });
      onRateAdd(data);
      notification("success", "Rekomendacja dodana pomyślnie", "Operacja dodawania rekomendacji zakończona pomyślnie.")
    } catch (error) {
      notification("error", "Błąd podczas dodawania rekomendacji", "Podczas dodawania rekomendacji wystąpił błąd. Spróbuj ponownie później.")
    }
  }

  return <div className="game-rating-form">
    <div className={`form-wrapper ${collapes ? 'form-collapse' : ''}`}>
      <h3>Dodaj własną rekomendację:</h3>
      <Formik
        initialValues={initValues}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <form onSubmit={handleSubmit} className={`form ${collapes ? 'form-collapse' : ''}`}>
            <span className="margin">Nazwa użytkownika:</span>
            <Input
              placeholder="Podaj nazwę użytkownika"
              value={values.userName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFieldValue("userName", event.currentTarget.value)}
            />
            <span className="align-center margin">Ocena:</span>
            <Rate
              value={values.rating}
              onChange={(value: number) => setFieldValue("rating", value)}
            />
            <span className="margin">Opis:</span>
            <TextArea
              placeholder="Podaj opis rekomendacji"
              value={values.reason}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setFieldValue("reason", event.currentTarget.value)}
            />
            <Button htmlType="submit" type="primary">
              Dodaj
            </Button>
          </form>
        )}
      </Formik>
    </div>
    {!collapes && <Button onClick={() => setCollapse(!collapes)}>Dodaj rekomendację</Button>}
  </div>
};

export default GameRatingForm;
