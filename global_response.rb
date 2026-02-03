# Framework: Ruby on Rails
# Archivo: global_response.rb

module Api
  # Respuesta estándar para operaciones de API en Rails
  class GlobalResponse
    attr_accessor :success, :message, :code, :data, :total_rows, 
                  :current_page, :total_pages, :page_size

    def initialize
      @success = false
      @message = ''
      @code = ''
      @data = nil
      @total_rows = 0
      @current_page = 0
      @total_pages = 0
      @page_size = 0
    end

    # Crea una respuesta exitosa simple
    def self.ok(message = 'Operación exitosa')
      response = new
      response.success = true
      response.message = message
      response.to_hash
    end

    # Crea una respuesta exitosa con datos
    def self.ok_with_data(data, message = 'Operación exitosa', code = '')
      response = new
      response.success = true
      response.data = data
      response.message = message
      response.code = code unless code.empty?
      response.to_hash
    end

    # Crea una respuesta exitosa con paginación
    def self.ok_paginated(data, total_rows, current_page, page_size, 
                          message = 'Operación exitosa', code = '')
      response = new
      response.success = true
      response.data = data
      response.total_rows = total_rows
      response.current_page = current_page
      response.page_size = page_size
      response.total_pages = page_size.positive? ? (total_rows.to_f / page_size).ceil : 0
      response.message = message
      response.code = code unless code.empty?
      response.to_hash
    end

    # Crea una respuesta de error
    def self.error(message, code = 'ERROR')
      response = new
      response.success = false
      response.message = message
      response.code = code
      response.to_hash
    end

    # Crea una respuesta de error con datos
    def self.error_with_data(data, message, code = 'ERROR')
      response = new
      response.success = false
      response.data = data
      response.message = message
      response.code = code
      response.to_hash
    end

    # Convierte a hash eliminando valores vacíos
    def to_hash
      hash = { success: @success }
      hash[:message] = @message unless @message.empty?
      hash[:code] = @code unless @code.empty?
      hash[:data] = @data unless @data.nil?
      hash[:total_rows] = @total_rows if @total_rows.positive?
      hash[:current_page] = @current_page if @current_page.positive?
      hash[:total_pages] = @total_pages if @total_pages.positive?
      hash[:page_size] = @page_size if @page_size.positive?
      hash
    end
  end
end

# Ejemplo de uso en Rails
=begin
class Api::UsersController < ApplicationController
  def index
    users = [
      { id: 1, name: 'Juan' },
      { id: 2, name: 'María' }
    ]
    
    render json: Api::GlobalResponse.ok_with_data(users, 'Usuarios obtenidos')
  end

  def paginated
    users = (1..10).map { |i| { id: i, name: "User#{i}" } }
    
    render json: Api::GlobalResponse.ok_paginated(users, 100, 1, 10)
  end

  def error_example
    render json: Api::GlobalResponse.error('Usuario no encontrado', 'NOT_FOUND'),
           status: :not_found
  end
end
=end