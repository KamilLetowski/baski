import React from 'react';
import { Formik } from 'formik';
import { Input, Button } from 'antd';
import { object, string } from 'yup';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import Game from '../../models/Game';

type Props = {
  initValues: Game;
  onFormSubmit(game: Game): void;
  isLoading: boolean;
}

const { TextArea } = Input;
const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

const GameForm: React.FC<Props> = ({ initValues, onFormSubmit, isLoading }) => {
  return <div>
    {isLoading ? <Spin indicator={antIcon} />
      : <Formik
        initialValues={initValues}
        onSubmit={onFormSubmit}
        validationSchema={object().shape({
          name: string().required('Pole jest wymagane'),
          description: string().required('Pole jest wymagane'),
          imageUrl: string().required('Pole jest wymagane')
        })}
      >
        {({ handleSubmit, values, setFieldValue, errors, touched, setFieldTouched }) => <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <span>Podaj nazwę gry</span>
            <Input
              placeholder="Podaj nazwę gry"
              value={values.name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFieldTouched("name")
                setFieldValue("name", event.currentTarget.value)
              }}
            />
            {touched.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="input-wrapper">
            <span>Podaj opis gry</span>
            <TextArea
              placeholder="Podaj opis gry"
              rows={6}
              value={values.description}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                setFieldTouched("description")
                setFieldValue("description", event.currentTarget.value)
              }}
            />
            {touched.description && <span className="error">{errors.description}</span>}
          </div>
          <div className="input-wrapper">
            <span>Podaj link do zdjęcia</span>
            <Input
              placeholder="Podaj link do zdjęcia"
              value={values.imageUrl}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFieldTouched("imageUrl")
                setFieldValue("imageUrl", event.currentTarget.value)
              }}
            />
            {touched.imageUrl && <span className="error">{errors.imageUrl}</span>}
          </div>
          <Button htmlType="submit" type="primary">
            Zapisz zmiany
          </Button>
        </form>
        }
      </Formik >
    }
  </div >
};

export default GameForm;
